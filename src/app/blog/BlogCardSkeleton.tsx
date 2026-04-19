type BlogCardSkeletonProps = {
  framed?: boolean;
};

export default function BlogCardSkeleton({ framed = true }: BlogCardSkeletonProps) {
  const content = (
    <>
      <div className="h-48 sm:h-48 lg:h-52 bg-border animate-pulse" />
      <div className="flex grow flex-col p-3 sm:p-4 space-y-2">
        <div className="h-5 w-24 rounded-full bg-border animate-pulse sm:h-6 sm:w-28" />
        <div className="h-7 w-4/5 rounded bg-border animate-pulse sm:h-8" />
        <div className="h-3 w-full rounded bg-border animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-border animate-pulse" />
      </div>
    </>
  );

  if (!framed) {
    return content;
  }

  return (
    <div className="flex flex-col rounded-xl sm:rounded-2xl border-2 border-border overflow-hidden bg-background">
      {content}
    </div>
  );
}
