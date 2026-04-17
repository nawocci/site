export default function BlogCardSkeleton() {
  return (
    <>
      <div className="h-48 sm:h-48 lg:h-52 bg-border animate-pulse" />
      <div className="p-3 sm:p-4 space-y-2">
        <div className="h-6 w-28 rounded-full bg-border animate-pulse" />
        <div className="h-7 w-3/4 rounded bg-border animate-pulse" />
        <div className="h-4 w-full rounded bg-border animate-pulse" />
      </div>
    </>
  );
}