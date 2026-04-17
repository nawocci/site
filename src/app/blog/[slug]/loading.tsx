export default function BlogPostLoading() {
  return (
    <article className="w-full pb-8 sm:pb-10 lg:pb-14 font-mono motion-fade-up">
      <div className="space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-4 motion-fade-up">
          <div className="h-11 w-11 rounded-full border-2 border-border animate-pulse sm:h-11 sm:w-11" />
          <div className="h-3 w-16 rounded bg-border animate-pulse" />
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-border bg-border animate-pulse" />
      </div>

      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        <header className="space-y-4 border-b pb-6 motion-fade-up motion-delay-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="h-6 w-28 rounded-full bg-border animate-pulse" />
            <div className="h-6 w-44 rounded-full bg-border animate-pulse" />
          </div>

          <div className="h-3 w-12 mx-auto rounded bg-border animate-pulse" />
          <div className="h-10 w-3/4 mx-auto rounded bg-border animate-pulse sm:h-12" />
          <div className="h-5 w-2/3 mx-auto rounded bg-border animate-pulse" />
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
