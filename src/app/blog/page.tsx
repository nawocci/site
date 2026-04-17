import { Suspense } from "react";

import { PostsGrid, PostsGridSkeleton } from "./PostsGrid";

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <main className="w-full space-y-5 sm:space-y-6 lg:space-y-10 font-mono">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="text-sm sm:text-base text-foreground/65">Latest posts from the studio.</p>
      </header>

      <Suspense fallback={<PostsGridSkeleton />}>
        <PostsGrid />
      </Suspense>
    </main>
  );
}
