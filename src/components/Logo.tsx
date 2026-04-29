import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3 cursor-pointer">
      <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 transition-transform duration-200 group-hover:scale-110 md:h-12 md:w-12">
        <Image
          src="https://avatars.githubusercontent.com/nawocci"
          alt="Naufal Altaf"
          fill
          sizes="(max-width: 768px) 36px, 48px"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-bold text-foreground md:text-lg">~/</span>
        <span className="truncate text-lg font-bold text-primary md:text-2xl">
          naufal-altaf
        </span>
      </div>
    </Link>
  );
}
