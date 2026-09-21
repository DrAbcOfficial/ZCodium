# ZCode Open Audit

<div align="center">
  <img src="public/logo/icons/1024x1024.png" alt="ZCode" width="128" height="128" />
  <p><strong>An independent security audit and hardening fork of ZCode</strong></p>
</div>
<p align="center">
  <a href="README.md">简体中文</a> | English ·
  <a href="https://zcode-open-audit.github.io/Zcode-Open-Audit/">Project site</a>
</p>

> This repository is forked from [zai-org/ZCode](https://github.com/zai-org/ZCode), open-sourced by Zhipu on September 21, 2026. We do not treat vendor promises as a security guarantee — we audit the code itself.

## Why this fork exists

On September 18, 2026, developer [ferstar](https://blog.ferstar.org/posts/zcode-silent-workspace-snapshot-upload/) published a full reverse-engineering investigation: while a user was signed in, the ZCode desktop client **silently packaged the entire workspace — including the complete Git history — encrypted it, and attempted to upload it to Alibaba Cloud OSS**. Multiple developers independently reproduced the findings, and Zhipu confirmed the behavior and apologized.

Key facts from the public evidence:

| Fact                                | Detail                                                                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Far beyond what inference needs     | In a 42,411-file sample, `.git` data accounted for 86.6%: full commit history, deleted secrets, unpushed branches, reflog, and LFS cache. Current source and docs were only about 13.4%                 |
| Users cannot decrypt their own data | AES-256-CTR encryption with the key wrapped by an RSA public key issued dynamically by the server. The private key exists only in the cloud; neither users nor the client can open the local ciphertext |
| No way to turn it off in the UI     | "Optimize experience" only controls training consent; "Repository snapshot indexing" only controls server-side indexing. Two independent investigations found no switch that stops packaging or upload  |
| High-frequency automatic triggers   | A snapshot was captured before every prompt; a single session log showed up to 62 snapshot events                                                                                                       |
| Auto re-upload after deletion       | After manually deleting the local snapshot, the background watcher re-packaged the whole workspace and retried upload (the original report recorded 564 failed attempts)                                |

### Timeline

| Date       | Event                                                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-18 | ferstar publishes the full investigation; developers independently reproduce it                                                                                                                      |
| 2026-09-18 | Zhipu apologizes in its user group: the behavior came from the "codebase indexing" feature being enabled by default; promises to open-source the client and bring in third-party audits              |
| 2026-09-19 | ZCode v3.14.0 ships ("fixes abnormal repo wiki uploads"); ferstar re-checks and confirms the upload component and endpoint are gone (endpoint returns 404)                                           |
| 2026-09-19 | Taiyuan Chengming Technology sends a formal demand letter on data deletion, private-key custody, and possible cross-border transfer, reserving the right to legal action                             |
| 2026-09-21 | Zhipu open-sources ZCode and publishes the first-round audit results from CAICT and NSFOCUS: the OSS bucket has been deleted, and v3.14.0 has removed the local snapshot generation and upload chain |

### Primary sources and coverage

| Source                                        | Link                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| ferstar's original investigation (first-hand) | https://blog.ferstar.org/posts/zcode-silent-workspace-snapshot-upload/ |
| Independent reproduction and mitigations      | https://blog.margrop.net/post/zcode-silent-git-upload-investigation/   |
| Official open-source repository               | https://github.com/zai-org/ZCode                                       |
| The Paper: Zhipu response and audit results   | https://www.thepaper.cn/newsDetail_forward_34111815                    |
| Jiemian News: demand letter and responses     | https://www.jiemian.com/article/15120609.html                          |
| ITHome: open-sourcing and apology             | https://www.ithome.com/1/005/046.htm                                   |
| Huxiu: incident retrospective                 | https://www.huxiu.com/article/4892416.html                             |
| ifeng: cross-border data questions            | https://tech.ifeng.com/c/8waIS4X7FAe                                   |

## What we did

This repository forks the client code Zhipu open-sourced on 2026-09-21 and completes a first-round independent audit:

1. **Verify the fix instead of trusting it**: we searched the whole repository for snapshot packaging, encryption, and direct-to-OSS upload logic, and confirmed the full `.git` packaging and upload implementation is no longer present in this version.
2. **Flag ongoing observation targets**: the current version still includes ARMS (Alibaba Cloud application monitoring) telemetry that reports device identifiers and network request metadata (host, path, timing, error codes). The first-round audit found no content-level reporting, but it stays under observation.
3. **Establish a per-version audit baseline**: v3.14.0 is the baseline; every future upstream update gets a diff audit.

> The first-round audit is a static code search, not full dynamic forensics. Findings and limitations will be updated continuously.

## What we will keep doing

- **Track and sync upstream**: review every change in [zai-org/ZCode](https://github.com/zai-org/ZCode) promptly, run a per-version diff audit, and only sync risk-free code. Changes involving data exfiltration, telemetry overreach, or permission expansion are never merged directly; they are recorded and explained publicly first.
- **Filter potentially harmful code**: if we find silent exfiltration, telemetry overreach, or unconsented data upload, we remove it or add guardrails in this repository, and disclose what changed and why.
- **Trust verifiable evidence only**: claims such as "deleted", "not retained", or "never used for training" are not treated as security guarantees unless independently verifiable.
- **Publish audit records**: findings, methods, and conclusions are recorded in this repository and on the [project site](https://zcode-open-audit.github.io/Zcode-Open-Audit/).

## Build and Release

- **GitHub builds**: audited code is built in this repository with GitHub Actions. CLI distributions are published to [Releases](https://github.com/Zcode-Open-Audit/Zcode-Open-Audit/releases), and the project site is deployed automatically with GitHub Pages. Every artifact comes from the audited source in this repository and contains no unsynced upstream changes.
- **Release flow**: run the [Release](https://github.com/Zcode-Open-Audit/Zcode-Open-Audit/actions/workflows/release.yml) workflow manually in Actions, enter a version (for example `3.14.0-audit.1`) to create the tag, publish the release, and build and upload the CLI distribution; check pre-release to mark it as a Pre-release.
- **Upstream sync**: review upstream changes → per-version diff audit → sync risk-free code only → publish conclusions in the audit record.

## Disclaimer

This repository is not affiliated with Zhipu (Beijing Zhipu Huazhang Technology Co., Ltd.). All facts come from public reporting and independent code audits, with sources cited. If any party believes something is inaccurate, please open an issue.

---

The sections below are the upstream ZCode usage and development documentation. Upstream community: [Feishu community](https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=47ag983c-8fcb-4d6d-814b-5395193a712c&qr_code=true) · [Discord](https://discord.gg/z9aBcQXZQ3).

ZCode is an AI coding workspace with desktop, browser, and terminal interfaces. This repository contains the clients, backend services, shared UI, and Agent CLI and runtime source code.

| Interface                    | Purpose                                                                                   | Development command            |
| ---------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------ |
| Desktop                      | Electron desktop application                                                              | `pnpm dev:desktop`             |
| Web / ZCode CLI distribution | Terminal and browser workspace; packages the TUI, Web client, backend, and Agent together | `pnpm dev:web`                 |
| Agent CLI                    | The `zcode` terminal interface, which also provides the Agent runtime for Desktop and Web | `pnpm --filter @zcode/cli dev` |

## Setup

Install Git, Node.js **24.14.0**, and pnpm **10.33.2**. [mise.toml](mise.toml) is the source of truth for tool versions. Run all development and packaging commands below from the repository root.

```bash
pnpm bootstrap
```

`pnpm bootstrap` installs workspace dependencies, prepares local desktop runtime assets, and runs `build:bootstrap`.

The Agent CLI and runtime source code lives in [apps/zcode-cli/](apps/zcode-cli/) as a regular directory included when you clone this repository. No separate checkout or Git submodule initialization is required.

Additional setup and build commands:

| Command                        | Purpose                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`                 | Install dependencies                                                                                                                |
| `pnpm prepare:desktop-runtime` | Prepare desktop runtime assets, including remote assets by default                                                                  |
| `pnpm prepare:remote-assets`   | Prepare remote runtime assets separately                                                                                            |
| `pnpm bootstrap:with-remote`   | Set up dependencies and local and remote assets, then build the relevant packages sequentially; skip the desktop application bundle |
| `pnpm build`                   | Recursively run each workspace package's build script, including its asset preparation steps                                        |

The default `bootstrap` skips remote asset preparation and is suitable for local desktop development. Run the corresponding preparation command when working with remote workspaces or validating remote distribution assets.

## Development and Usage

### Desktop

```bash
pnpm dev:desktop

# Use the test environment
pnpm dev:desktop:test
```

`pnpm dev:desktop` defaults to `pnpm dev:desktop:prod` and uses production service configuration. The startup script prepares local runtime assets, builds the desktop Agent, then starts Electron and source watchers.

Set `ZCODE_DATA_BASE_DIR` to use a separate development data directory. For example, on macOS / Linux:

```bash
ZCODE_DATA_BASE_DIR="$HOME/.zcode-dev-home" pnpm dev:desktop:test
```

### Web Development

Use development mode when editing Web or backend source code:

```bash
pnpm dev:web

# Set the backend workspace (macOS / Linux)
ZCODE_SERVER_WORKSPACE=/path/to/project pnpm dev:web
```

This starts both the Web development server (default: `http://localhost:5173`) and the backend (default: `http://localhost:3030`). Open the Web development server in your browser. `/ws` and general `/api` requests are proxied to the local backend; `/api/v1/oauth/token` is proxied separately to the configured product service.

After changing Agent source code, run `pnpm --filter @zcode/cli... build` and restart the service. To validate the complete distribution, extract and run it as described under Packaging → ZCode CLI distribution below.

### ZCode CLI distribution

The command-line distribution includes the TUI, Web client, and Agent behind one `zcode` command. With no arguments it starts the TUI; a leading `--web` starts Web mode; all other arguments go to the existing Agent CLI. Both modes run locally without Electron.

```bash
# Start the terminal UI by default
zcode

# Start the Web interface
zcode --web

# Set the project and port without opening a browser automatically
zcode --web --workspace /path/to/project --port 3030 --no-open

# Show CLI or Web options
zcode --help
zcode --web --help
```

In Web mode, it uses the current directory as the workspace, listens on `127.0.0.1` without token authentication by default, selects an available port, and opens a browser. Use the URL printed in the terminal and press `Ctrl+C` to stop the service. For LAN access, use `--host 0.0.0.0`; listening on a non-local address generates an access token by default. Use the token-bearing URL printed in the terminal. Set a token with `--token`, or disable token authentication with `--no-token`.

When starting the general Web service's HTTP entry directly, configure API/WebSocket authentication with `ZCODE_SERVER_AUTH_TOKEN`. When creating the service programmatically, use the `authToken` option.

See Packaging below for build instructions. `pnpm build:zcode` only creates the distribution; it does not replace an existing `zcode` on `PATH`. If the command still points to an older installation or another checkout, check it with `command -v zcode` on macOS / Linux or `where.exe zcode` on Windows.

### CLI Source Development

Use the source entry when developing the TUI or Agent:

```bash
pnpm --filter @zcode/cli dev --help
pnpm --filter @zcode/cli dev

# Build the CLI and its workspace dependencies
pnpm --filter @zcode/cli... build
node apps/zcode-cli/packages/cli/dist/zcode.cjs --help
```

This entry runs the Agent CLI directly and does not handle the distribution's `--web` switch. Use `pnpm dev:web` for Web development, or the extracted `bin/zcode.mjs` shown below to test the unified command.

## Configuration

The root [.env.example](.env.example) provides sample service URLs and build configuration. Copy it to `.env` as needed and place local overrides in `.env.local`. Select the Desktop development environment with `dev:desktop:test` or `dev:desktop:prod`.

| Setting                              | Purpose                                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| `ZCODE_DATA_BASE_DIR`                | Base directory for application data, stored under its `.zcode/` subdirectory            |
| `ZCODE_SERVER_WORKSPACE`             | Workspace path for the Web backend                                                      |
| `ZCODE_BUILTIN_PROVIDER_CONFIG_FILE` | Path to a local provider configuration file; uses the built-in configuration when unset |
| `ZCODE_DIST_BASE_URL`                | Download base URL used by the CLI distribution installer                                |

Runtime variables can be set explicitly in the environment of the startup command. See [config/README.md](config/README.md) for the default configuration shipped with the client.

## Packaging

See [third-party/README.md](third-party/README.md) for notice generation, distribution checks, and where the notices are included in each distribution.

### Desktop

```bash
pnpm bundle:desktop

# Set the target platform and CPU architecture
pnpm bundle:desktop -- --os win --arch x64

pnpm bundle:desktop -- --help
```

The default target is macOS arm64, and the default output directory is `packages/desktop/dist/`. `--os` accepts `mac`, `win`, or `linux`; `--arch` accepts `x64` or `arm64`. Packaging and signing require the tools and configuration for the target platform.

### ZCode CLI distribution

Run `pnpm build:zcode` to build the CLI/TUI, backend, and Web client, collect the TUI native libraries, workers, and runtime dependencies, then assemble the distribution. Running the distribution still requires Node.js; use the version specified in `mise.toml`.

Before packaging, set the download base URL with `ZCODE_DIST_BASE_URL` in `.env`, `.env.local`, or the process environment, or pass it through `--base-url`. The URL below is a placeholder; replace it with your hosting URL when publishing:

```bash
pnpm build:zcode --base-url https://downloads.example.com/zcode/

# When ZCODE_DIST_BASE_URL is already configured
pnpm build:zcode

# Repackage existing Agent, backend, and Web build outputs
pnpm build:zcode --skip-build

# Show options for the version, output directory, and more
pnpm build:zcode --help
```

The version defaults to the root `package.json` version. Output is written to `dist/zcode/`:

- `releases/<version>/zcode-<version>.tar.gz`: runtime package.
- `releases/<version>/sha256.txt`: checksum file.
- `latest.json` and `install.sh`: version index and installer.

Upload the entire directory to the configured download base URL. The installer downloads the runtime package from that URL, installs it to `~/.zcode/runtime` by default, and creates the `zcode` command in `~/.local/bin`. Override these directories with `ZCODE_DIST_HOME` and `ZCODE_DIST_BIN_DIR`, respectively.

Existing Lite users should switch to the new build command, environment variables, and installer. Installation does not remove old Lite directories or migrate/delete session data.

To test a packaged build locally, extract and run it directly without uploading or installing it:

```bash
zcode_version=$(node -p "require('./dist/zcode/latest.json').version")
mkdir -p dist/zcode/debug
tar -xzf "dist/zcode/releases/$zcode_version/zcode-$zcode_version.tar.gz" \
  -C dist/zcode/debug
# Start the TUI by default
node dist/zcode/debug/zcode/bin/zcode.mjs

# Start Web mode
node dist/zcode/debug/zcode/bin/zcode.mjs --web \
  --workspace "$PWD" --port 3030 --no-open
```

Open `http://127.0.0.1:3030` to validate the complete flow, with one backend serving the Web pages and running the Agent. The port must be available; if `pnpm dev:web` is already running, choose another `--port`.

## Repository Structure

| Directory                                            | Responsibility                                                                          |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `packages/desktop`                                   | Electron Main, Host, Renderer, and desktop packaging                                    |
| `packages/web`                                       | Web client                                                                              |
| `packages/server`                                    | HTTP / WebSocket services and remote connections                                        |
| `packages/zcode-server-cli`                          | Standalone server startup and process management                                        |
| `packages/ui`                                        | Shared React components, hooks, and Zustand state                                       |
| `packages/services`                                  | Business services and persistence                                                       |
| `packages/shared`, `packages/rpc`, `packages/client` | Shared protocols and types, RPC framework, and Agent client SDK                         |
| `packages/provider`, `packages/provider-node`        | Common provider capabilities and Node implementations                                   |
| `apps/zcode-cli`                                     | Agent CLI, TUI, runtime, and tools                                                      |
| `site`                                               | Audit project site (Vite + Svelte + Tailwind CSS), deployed with GitHub Pages           |
| `scripts`, `config`, `third-party`                   | Build and maintenance scripts, built-in configuration, and third-party notice materials |

The project site source lives in [site/](site/), built with Vite + Svelte + Tailwind CSS v4. Build output goes to `docs/` and is served by GitHub Pages. To publish an update, run `pnpm --dir site build` and commit the output under `docs/`.

## Project Notice

See [NOTICE.md](NOTICE.md) for feature and promotion scope, maintenance policy, execution and data risks, licensing, and third-party copyright information.
