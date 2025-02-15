import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full flex flex-col items-center justify-center animate-fadeIn">
      <h1 className="text-7xl sm:text-9xl font-bold">404</h1>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl sm:text-2xl">Page Not Found</p>
        <Link href="/" className="text-md sm:text-xl text-primary lg:hover:underline">Return to Home</Link>
      </div>
    </main>
  );
}