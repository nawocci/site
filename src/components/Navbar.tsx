import Link from "next/link";
import Image from "next/image";
import { FiBookOpen, FiMail } from "react-icons/fi";

const actionPillClasses =
  "hidden rounded-full border-2 px-6 py-2.5 text-base font-bold text-foreground transition-colors hover:border-primary hover:text-primary md:inline-flex";

const actionIconClasses =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border-2 text-foreground transition-colors hover:border-primary hover:text-primary md:hidden";

export default function Navbar() {
  return (
    <nav className="-mx-4 border-b border-border px-4 py-6 font-mono sm:mx-0 sm:border-b-0 sm:px-0 sm:py-10">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <Link href="/" className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-4 cursor-pointer">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
            <Image
              src="https://avatars.githubusercontent.com/nawocci"
              alt="Naufal Altaf"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 items-baseline gap-1">
            <span className="text-base font-bold text-foreground sm:text-lg">~/</span>
            <span className="truncate text-xl font-bold text-primary sm:text-2xl">naufal-altaf</span>
          </div>
        </Link>

        <div className="ml-2 flex shrink-0 items-center gap-4 sm:gap-6">
          <Link href="/blog" className={actionPillClasses}>
            blog
          </Link>
          <a href="mailto:naufal@altaf.xyz" className={actionPillClasses}>
            contact
          </a>
          <Link href="/blog" aria-label="Blog" className={actionIconClasses}>
            <FiBookOpen className="h-4 w-4" />
          </Link>
          <a href="mailto:naufal@altaf.xyz" aria-label="Contact" className={actionIconClasses}>
            <FiMail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
