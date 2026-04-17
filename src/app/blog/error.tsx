"use client";

import { useEffect } from "react";
import { UI_BUTTON_CLASSNAMES } from "@/lib/ui.classes";

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
    <main className="w-full py-2 sm:py-6 lg:py-10 font-mono">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border-2 border-border bg-background px-5 py-7 sm:rounded-3xl sm:px-8 sm:py-10 motion-scale-in">
        <p className="text-xs uppercase text-foreground/55 motion-fade-up" style={{ letterSpacing: "0.25em" }}>
          Blog Error
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-foreground motion-fade-up motion-delay-1">
          Could not load this blog view.
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/70 motion-fade-up motion-delay-2">
          Please try again. If this keeps happening, check the Sanity connection and query data.
        </p>
        <div className="mt-6 motion-fade-up motion-delay-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className={`${UI_BUTTON_CLASSNAMES.secondary} w-full justify-center sm:w-auto`}
          >
            Retry
          </button>
        </div>
      </section>
    </main>
  );
}