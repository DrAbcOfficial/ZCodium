# The ZCode Silent Upload Incident

> This document records the full course of the September 2026 incident in which ZCode silently packaged and uploaded user workspaces: how it was discovered, the technical evidence, the timeline, the official response, and what followed. All content comes from public sources listed at the end.
>
> This repository is an independent audit fork and is not affiliated with Zhipu (Beijing Zhipu Huazhang Technology Co., Ltd.).

## Summary

- **2026-09-18**: while cleaning up disk space, developer ferstar found that `~/.zcode` had grown unexpectedly large. Reverse engineering confirmed that, while a user was signed in, the ZCode desktop client **silently packaged the entire workspace (including the complete `.git` history), encrypted it, and attempted to upload it to Alibaba Cloud OSS**.
- **Key evidence**: in a 42,411-file sample, `.git` data accounted for 86.6%; the decryption private key existed only in the cloud, so neither the user nor the client could decrypt the local ciphertext; no UI switch stopped packaging or upload; deleting the local snapshot triggered a full re-package and re-upload.
- **Official response**: Zhipu apologized the same day, attributing the behavior to the "codebase indexing" feature being enabled by default, and promised to open-source the client and bring in third-party audits; v3.14.0 shipped the next day with the upload chain removed.
- **Third-party verification**: on 2026-09-21 Zhipu open-sourced ZCode and published first-round audit results from CAICT and NSFOCUS — the OSS bucket has been deleted and v3.14.0 no longer generates or uploads local repository snapshots.

## 1. How it was discovered

The story did not start with a security audit, but with disk cleanup.

ferstar noticed that `~/.zcode` occupied over 700 MB. Digging further, they found a **313 MB encrypted file (`.enc`)** plus a status file under `v2/checkpoints/`:

```json
{
  "workspacePath": "/Users/<user>/myprojects/<a commercial project>",
  "kind": "baseline",
  "lastCompressedSize": {
    "encryptedSizeBytes": 313070842,
    "workspaceSizeBytes": 345549173
  },
  "failureCount": 564
}
```

The client had scanned a local commercial project, excluded a few directories such as `node_modules`, and packaged about 345 MB of content into a 313 MB encrypted archive marked as a `baseline` (full snapshot). Due to upload failures, the snapshot had **failed 564 times** and remained in the local `pending/` directory awaiting retry — those 564 failures are exactly what preserved a complete forensic sample.

After examining the client's `app.asar`, runtime logs, and network connections, ferstar reconstructed the full packaging and upload chain and published the complete analysis on September 18. Multiple developers independently reproduced the behavior, confirming it was not an isolated case.

## 2. Technical evidence

### 2.1 Scope: far beyond task context

A plaintext manifest left on disk showed a single sample containing **42,411 files**:

| Content         | Size         | Share    | What it contains                               |
| --------------- | ------------ | -------- | ---------------------------------------------- |
| `.git/lfs/`     | 196.1 MB     | 56.8%    | All large files and binaries ever pulled       |
| `.git/objects/` | 102.2 MB     | 29.6%    | Full commit history (Commit / Tree / Blob)     |
| `.git/logs/`    | 0.6 MB       | 0.2%     | reflog: local branch operations, unpushed work |
| Source and docs | ~46.2 MB     | 13.4%    | `src/`, configuration, and business code       |
| **Total**       | **345.2 MB** | **100%** | **`.git` internals: 86.6%**                    |

So the upload was not "the code snippets needed for the current task". It could also include:

- secrets and configuration deleted long ago but still recoverable from history;
- local branches not yet pushed to any remote;
- internal GitLab hostnames and repository paths from `.git/config`;
- the complete reflog trail.

The code also contained `repo_snapshot_extra_manifest`, which hashed ZCode's global configuration (such as `settings.behavior.json`) and included it in every snapshot across workspaces.

### 2.2 The upload chain

The reconstructed chain bypasses Zhipu's own business servers and uploads directly to object storage:

```
Client                          Server                    Alibaba Cloud OSS
  │                               │                          │
  ├─ POST /api/v1/snapshot/upload-credential ─►│            │
  │                               │                          │
  │◄─ snapshot_id / OSS form signature / RSA public key / callback ──│
  │                               │                          │
  ├─ local tar.gz → AES-256-CTR → RSA-OAEP wrapped key       │
  │                               │                          │
  ├─ PostObject form upload of tar.gz.enc ──────────────────►│
  │                               │◄─ callback registration ─┤
```

1. The client requests upload credentials from `https://zcode.z.ai/api/v1/snapshot/upload-credential` with the signed-in JWT;
2. The server returns an OSS form signature (`policy`, `x-oss-signature`), an object key, a size limit, and the RSA public key for this upload;
3. The client packages and envelope-encrypts the workspace locally, then uploads the ciphertext to Alibaba Cloud OSS via HTTP POST form;
4. OSS triggers a callback so the backend registers the upload.

### 2.3 Encryption: the private key never leaves the cloud

- The archive is encrypted locally with a randomly generated symmetric key using **AES-256-CTR**;
- That key is then wrapped with the **RSA public key (RSA-OAEP-SHA256)** issued dynamically by the server;
- **The private key exists only in the cloud**: neither the user nor the client can decrypt the local ciphertext.

From a data-ownership perspective this looks more like collection than backup — a genuine backup or crash-recovery feature would keep the decryption key on the user's side.

### 2.4 Why the settings cannot turn it off

| Setting                      | What users assumed it controls     | What it actually controls                        |
| ---------------------------- | ---------------------------------- | ------------------------------------------------ |
| Optimize experience          | Telemetry / upload collection      | Whether data may be used for model training      |
| Repository snapshot indexing | Workspace snapshots / cloud backup | Whether the server indexes snapshots it receives |

Two independent investigations confirmed that the snapshot capture and upload component runs unconditionally once signed in, with no user-preference check in the code and no UI switch that stops packaging or upload.

### 2.5 Trigger frequency and automatic re-upload

- One trigger is `captureBeforePrompt`: a capture before **every prompt**;
- Another relates to `repo-wiki-update` at task completion;
- In ferstar's logs, a single active session produced up to **62 snapshot events**;
- After manually deleting the local snapshot, the background watcher **re-packaged the whole workspace and retried the upload** (the original sample kept retrying after 564 failures). Manual deletion alone does not stop it.

## 3. Timeline

| Date       | Event                                                                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-18 | ferstar publishes the full investigation; multiple developers reproduce it independently                                                                                                                    |
| 2026-09-18 | Zhipu apologizes in its official user group: the "codebase indexing" feature was enabled by default; promises to open-source ZCode, bring in third-party audits, and grant all users one weekly quota reset |
| 2026-09-19 | ZCode v3.14.0 ships ("fixes abnormal repo wiki uploads"); ferstar re-checks and confirms the upload component and credential endpoint are gone (endpoint returns 404)                                       |
| 2026-09-19 | Taiyuan Chengming Technology sends a public demand letter on deletion proof, private-key custody, and possible cross-border transfer, reserving the right to legal action                                   |
| 2026-09-20 | Zhipu's MaaS platform announces a forthcoming "no content retention" feature (persistent APIs such as Batch/File excluded; legally required records may be kept 30+ days)                                   |
| 2026-09-21 | Zhipu officially open-sources ZCode (`zai-org/ZCode`) and publishes CAICT and NSFOCUS first-round findings, promising monthly code security audit reports and a standing vulnerability-reporting channel    |

## 4. Official response and third-party verification

### 4.1 Zhipu's statements (2026-09-18 to 09-21)

- Uploads came from the "codebase indexing" feature, which supports history rollback, session checkpoint recovery, and Repo Wiki (repository knowledge base);
- Repo Wiki may trigger repository data upload when generating pages in the cloud; the feature was **enabled by default at launch**, which affected some users;
- Uploaded data was used only to generate the Wiki page and destroyed immediately afterwards, never stored, never used for training;
- The upload chain was removed in the first fix, and v3.14.0 has no Repo Wiki entry or snapshot upload path.

### 4.2 Third-party findings (2026-09-21)

- **CAICT** (China Academy of Information and Communications Technology): the zcode-prod Alibaba Cloud OSS bucket is in a "zero data" state; v3.14.0 has removed Repo Wiki and severed the local snapshot generation and upload chain;
- **NSFOCUS**: all data objects in the bucket — and the bucket itself — have been deleted; no path was found in v3.14.0 that could trigger local repository snapshots or file exfiltration;
- Zhipu committed to a standing product security vulnerability channel, monthly published code security audit reports, and a more community-driven process.

## 5. Open questions

As of this repository's review, the following still lack independently verifiable answers:

1. **Historical data**: a client update only stops new uploads; it cannot prove that data already received was fully deleted. The official statements describe the bucket's state at verification time.
2. **Cross-border transfer**: Chengming Technology noted that the operator behind the related domain is registered in Singapore, which conflicts with the Chinese privacy policy's "stored in China, no cross-border transfer" language; no public explanation has been provided.
3. **Impact scope**: which versions, which time window, and how many users were affected has not been fully disclosed.
4. **Server-side behavior**: outside researchers can check whether the client sends data, but cannot independently audit server-side access, use, and deletion logs.
5. **Private key custody**: the decryption key is generated and held by the server; its lifecycle and access records are not public.

## 6. Where this repository stands

- We **do not treat vendor promises as a security guarantee** — we audit the code itself;
- Our first-round audit confirms the full "package and upload the entire `.git`" implementation is no longer present in the open-source version; the remaining ARMS telemetry component is on our watch list;
- We will **keep tracking upstream, run per-version diff audits, and only sync risk-free code**; anything involving silent exfiltration, telemetry overreach, or unconsented upload is recorded and explained publicly first;
- See [README.en.md](README.en.md) for the full scope of commitments.

## 7. Primary sources and coverage

| Source                                        | Link                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| ferstar's original investigation (first-hand) | https://blog.ferstar.org/posts/zcode-silent-workspace-snapshot-upload/ |
| Independent reproduction and mitigations      | https://blog.margrop.net/post/zcode-silent-git-upload-investigation/   |
| Official open-source repository (upstream)    | https://github.com/zai-org/ZCode                                       |
| The Paper: Zhipu response and audit results   | https://www.thepaper.cn/newsDetail_forward_34111815                    |
| Jiemian News: demand letter and responses     | https://www.jiemian.com/article/15120609.html                          |
| ITHome: open-sourcing and apology             | https://www.ithome.com/1/005/046.htm                                   |
| Huxiu: incident retrospective                 | https://www.huxiu.com/article/4892416.html                             |
| ifeng: cross-border data questions            | https://tech.ifeng.com/c/8waIS4X7FAe                                   |

---

If any party believes this document is inaccurate, please open an [issue](https://github.com/Zcode-Open-Audit/Zcode-Open-Audit/issues).
