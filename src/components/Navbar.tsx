import Image from "next/image";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center min-h-24 sm:min-h-32">
            <a href="/" className="flex items-center gap-4">
                <Image src="https://github.com/nawocci.png" alt="logo" width={32} height={32} className="rounded-full sm:w-10 sm:h-10" />
                <h1 className="text-xl sm:text-2xl font-semibold">Naufal Altaf</h1>
            </a>
            <div className="flex items-center gap-6">
                <a href="mailto:me@altaf.xyz" className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto px-0 sm:px-4 py-2 text-sm sm:text-base font-semibold bg-primary rounded-md lg:hover:brightness-125 duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:hidden">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    <span className="hidden sm:inline">Contact</span>
                </a>
            </div>
        </div>
    );
}