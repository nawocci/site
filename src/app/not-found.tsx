import Link from "next/link";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";

import { UI_BUTTON_CLASSNAMES } from "@/lib/ui.classes";

export default function NotFound() {
  return (
    <main className="w-full py-2 sm:py-6 lg:py-10 font-mono">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border-2 border-border bg-background px-6 py-8 sm:rounded-3xl sm:px-8 sm:py-10 motion-scale-in">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground motion-fade-up">Error 404</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-4xl motion-fade-up motion-delay-1">
          Page not found
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base motion-fade-up motion-delay-2">
          The page you requested does not exist or may have been moved.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap motion-fade-up motion-delay-3">
          <Link href="/" className={`${UI_BUTTON_CLASSNAMES.secondary} w-full justify-center sm:w-auto`}>
            <FiArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/blog" className={`${UI_BUTTON_CLASSNAMES.secondary} w-full justify-center sm:w-auto`}>
            <FiBookOpen className="h-4 w-4" />
            Browse blog
          </Link>
        </div>
      </section>
    </main>
  );
}