import { BLOG_LIST_CLASSNAMES } from "./blog.classes";
import { PostsGridSkeleton } from "./PostsGrid";

export default function BlogLoading() {
  return (
    <main className={BLOG_LIST_CLASSNAMES.page}>
      <header className={BLOG_LIST_CLASSNAMES.header}>
        <h1 className={BLOG_LIST_CLASSNAMES.title}>Blog</h1>
        <p className={BLOG_LIST_CLASSNAMES.subtitle}>Latest posts from the studio.</p>
      </header>

      <PostsGridSkeleton />
    </main>
  );
}