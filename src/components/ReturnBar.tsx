import Link from "next/link";

export default function ReturnBar() {
  return (
    <Link href="/" className="h-10 flex justify-center items-center bg-primary sm:hover:brightness-110 duration-200">
      <p className="text-white font-semibold">Return to Home</p>
    </Link>
  );
}