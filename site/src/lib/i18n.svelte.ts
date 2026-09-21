export type Lang = "zh" | "en";

const STORAGE_KEY = "zcode-audit-lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "zh";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") return saved;
  } catch {
    // 隐私模式下 localStorage 可能不可用
  }
  const browserLang = navigator.language || "";
  return browserLang.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function applyDocumentLang(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title =
    lang === "zh"
      ? "ZCodium — ZCode 开源代码的独立审计"
      : "ZCodium — an independent audit of the ZCode source";
  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute(
    "content",
    lang === "zh"
      ? "ZCode 开源代码的独立审计与加固版本：监控与遥测已全部移除，上游改动逐提交审阅，发行包从审计后的源码构建。"
      : "An independently audited and hardened fork of the ZCode source: monitoring and telemetry removed, upstream commits reviewed one by one, artifacts built from the audited source.",
  );
}

// 模块加载时就确定语言：首帧直接渲染正确语言，不闪中文再切英文。
export const i18n = $state({ lang: detectInitialLang() });

applyDocumentLang(i18n.lang);

export function setLang(lang: Lang) {
  i18n.lang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // 忽略写入失败
  }
  applyDocumentLang(lang);
}

export function toggleLang() {
  setLang(i18n.lang === "zh" ? "en" : "zh");
}
