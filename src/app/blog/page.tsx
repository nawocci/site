import { Suspense } from "react";

import { BLOG_LIST_CLASSNAMES } from "./blog.classes";
import { PostsGrid, PostsGridSkeleton } from "./PostsGrid";

export const unstable_instant = { prefetch: "static" };

export default function BlogPage() {
  return (
    <main className={BLOG_LIST_CLASSNAMES.page}>
      <header className={BLOG_LIST_CLASSNAMES.header}>
        <h1 className={BLOG_LIST_CLASSNAMES.title}>Blog</h1>
        <p className={BLOG_LIST_CLASSNAMES.subtitle}>Things on my mind...</p>
      </header>

      <Suspense fallback={<PostsGridSkeleton />}>
        <PostsGrid />
      </Suspense>
    </main>
  );
}
