"use client";

import Link from "next/link";

export default function Error() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <h1 className="text-7xl sm:text-9xl font-bold">505</h1>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl sm:text-2xl">Internal Server Error</p>
        <Link href="/" className="text-md sm:text-xl text-primary lg:hover:underline">Return to Home</Link>
      </div>
    </main>
  );
}