import LoadingSpinner from '../../components/LoadingSpinner';

export default function Loading() {
  return (
    <main className="w-full h-full flex items-center justify-center fade-in">
      <LoadingSpinner size="lg" text="Loading post..." />
    </main>
  );
}
