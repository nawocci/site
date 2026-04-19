export default function BlogPostLoading() {
  return (
    <article className="w-full pb-8 sm:pb-10 lg:pb-14 font-mono motion-fade-up">
      <div className="space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-4 motion-fade-up">
          <div className="h-11 w-11 rounded-full border-2 border-border animate-pulse sm:h-10 sm:w-32 sm:rounded-full" />
          <p className="text-xs uppercase text-foreground/50" style={{ letterSpacing: "0.3em" }}>
            Article
          </p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-border bg-border shadow-lg shadow-foreground/15 animate-pulse sm:rounded-3xl" />
      </div>

      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        <header className="space-y-4 border-b pb-6 motion-fade-up motion-delay-1">
          <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
            <div className="h-6 w-28 rounded-full bg-border animate-pulse" />
            <div className="h-6 w-44 rounded-full bg-border animate-pulse" />
          </div>

          <p
            className="text-center text-xs uppercase text-foreground/55 motion-fade-up motion-delay-2"
            style={{ letterSpacing: "0.25em" }}
          >
            Title
          </p>
          <div className="h-10 w-3/4 mx-auto max-w-4xl rounded bg-border animate-pulse sm:h-12" />
          <div className="h-5 w-2/3 mx-auto max-w-3xl rounded bg-border animate-pulse" />
        </header>

        <div className="mx-auto w-full max-w-3xl space-y-3 motion-fade-up motion-delay-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-full rounded bg-border animate-pulse"
              style={{ width: `${100 - (index % 3) * 12}%` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
