import { codeToHtml } from "shiki";

import CodeBlockCopyButton from "./CodeBlockCopyButton";

type CodeBlockProps = {
  language?: string | null;
  code?: string | null;
  filename?: string | null;
};

type HighlightLanguage =
  | "bash"
  | "css"
  | "html"
  | "javascript"
  | "json"
  | "jsx"
  | "markdown"
  | "python"
  | "tsx"
  | "typescript"
  | "yaml"
  | "zsh";

const LANGUAGE_ALIASES: Record<string, HighlightLanguage> = {
  bash: "bash",
  shell: "bash",
  sh: "bash",
  zsh: "zsh",
  css: "css",
  html: "html",
  javascript: "javascript",
  js: "javascript",
  json: "json",
  jsx: "jsx",
  md: "markdown",
  markdown: "markdown",
  python: "python",
  ts: "typescript",
  tsx: "tsx",
  typescript: "typescript",
  yaml: "yaml",
  yml: "yaml",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeLanguage(language?: string | null): HighlightLanguage | null {
  if (!language) {
    return null;
  }

  const normalizedLanguage = language.trim().toLowerCase();
  return LANGUAGE_ALIASES[normalizedLanguage] ?? null;
}

function formatLanguageLabel(language?: string | null) {
  const normalizedLanguage = language?.trim().toLowerCase();
  if (!normalizedLanguage) {
    return "Code";
  }

  if (normalizedLanguage === "js") return "JavaScript";
  if (normalizedLanguage === "ts") return "TypeScript";
  if (normalizedLanguage === "tsx") return "TSX";
  if (normalizedLanguage === "jsx") return "JSX";
  if (normalizedLanguage === "md") return "Markdown";
  if (normalizedLanguage === "yml") return "YAML";
  if (normalizedLanguage === "sh") return "Shell";
  if (normalizedLanguage === "zsh") return "Zsh";
  return normalizedLanguage.replace(/\b\w/g, (character) => character.toUpperCase());
}

export default async function CodeBlock({ language, code, filename }: CodeBlockProps) {
  const rawCode = (code ?? "").trimEnd();
  if (!rawCode) {
    return null;
  }

  const highlightedLanguage = normalizeLanguage(language);
  const languageLabel = filename?.trim() || formatLanguageLabel(language);

  const highlightedHtml = highlightedLanguage
    ? await codeToHtml(rawCode, {
        lang: highlightedLanguage,
        themes: {
          light: "github-light-default",
          dark: "github-dark-default",
        },
      })
    : `<pre class="shiki border-0 bg-transparent p-0"><code>${escapeHtml(rawCode)}</code></pre>`;

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-border bg-background shadow-md shadow-foreground/10">
      <figcaption className="flex items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-4 py-2.5">
        <span className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {languageLabel}
        </span>
        <CodeBlockCopyButton code={rawCode} />
      </figcaption>

      <div className="overflow-x-auto">
        <div
          className="code-block [&_pre]:m-0 [&_pre]:px-6 [&_pre]:py-4 [&_pre_code]:font-mono [&_pre_code]:text-sm [&_pre_code]:leading-7"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </div>
    </figure>
  );
}
