export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-primary font-semibold">Loading...</p>
      </div>
    </div>
  );
}
