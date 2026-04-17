import { PostsGridSkeleton } from "./PostsGrid";

export default function BlogLoading() {
  return (
    <main className="w-full space-y-5 sm:space-y-6 lg:space-y-10 font-mono">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="text-sm sm:text-base text-foreground/65">Latest posts from the studio.</p>
      </header>

      <PostsGridSkeleton />
    </main>
  );
}