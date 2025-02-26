export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center animate-fadeIn">
      <div className="text-center">
        <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-primary">Loading...</p>
      </div>
    </div>
  );
} 