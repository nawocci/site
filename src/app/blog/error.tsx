"use client";

import { useEffect } from "react";

export default function BlogError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full space-y-4 sm:space-y-5 font-mono">
      <p className="text-xs uppercase text-foreground/55" style={{ letterSpacing: "0.25em" }}>
        Blog Error
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Could not load this blog view.</h1>
      <p className="text-sm sm:text-base text-foreground/70">Please try again. If this keeps happening, check the Sanity connection and query data.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="inline-flex rounded-full border-2 border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
      >
        Retry
      </button>
    </main>
  );
}