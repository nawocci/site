import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fadeIn">
      <Image
        src="/images/404.png"
        alt="404 Not Found"
        width={400}
        height={400}
        className="rounded-lg"
      />
      <Link href="/">
        <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-opacity-80 transition-colors duration-200">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
