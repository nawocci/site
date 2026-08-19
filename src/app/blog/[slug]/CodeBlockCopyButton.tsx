"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

const COPY_BUTTON_CLASS =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary";

export default function CodeBlockCopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1600);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={COPY_BUTTON_CLASS}
      aria-label={isCopied ? "Copied code" : "Copy code"}
    >
      {isCopied ? <FiCheck className="h-3.5 w-3.5" /> : <FiCopy className="h-3.5 w-3.5" />}
      <span>{isCopied ? "Copied" : "Copy"}</span>
    </button>
  );
}
