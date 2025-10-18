import { HiOutlineDocumentText, HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi2";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 fade-in">
      <h1 className="text-center text-3xl lg:text-6xl font-semibold">
        Student & Developer<br/>Based in Indonesia
      </h1>
      <p className="text-center text-sm lg:text-lg brightness-[25%] dark:brightness-50">
        Hello, I&apos;m Naufal Altaf. I (sometimes) write, code, and build things that I like and use.<br className="hidden lg:block"/>
        <span className="lg:hidden"> </span>I work on frontend, mobile development, and machine learning.
      </p>
      
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 mt-4 lg:mt-8 w-full lg:w-auto">
        <a 
          href="/files/CV Naufal Altaf.pdf"
          download
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-2xl font-medium hover:border-primary hover:text-primary duration-200"
        >
          <HiOutlineDocumentText className="w-5 h-5" />
          <span className="font-semibold">Curriculum Vitae (CV)</span>
        </a>
        <div className="flex gap-3 lg:contents">
          <a 
            href="/files/nawo-ssh.pub"
            download
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-2xl font-medium hover:border-primary hover:text-primary duration-200 flex-1 lg:flex-none"
          >
            <HiOutlineLockClosed className="w-5 h-5" />
            <span className="font-semibold">SSH Key</span>
          </a>
          <a 
            href="/files/nawo-gpg.pub"
            download
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-2xl font-medium hover:border-primary hover:text-primary duration-200 flex-1 lg:flex-none"
          >
            <HiOutlineShieldCheck className="w-5 h-5" />
            <span className="font-semibold">GPG Key</span>
          </a>
        </div>
      </div>
    </div>
  );
}
