import { HiOutlineDocumentText, HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi2";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 fade-in">
      <h1 className="text-center text-7xl font-semibold">
        Student & Developer<br/>Based in Indonesia
      </h1>
      <p className="text-center text-xl brightness-[25%] dark:brightness-50">
        Hello, I&apos;m Naufal Altaf. I (sometimes) write, code, and build things that I like and use.<br/>I work on frontend, mobile development, and machine learning.
      </p>
      
      <div className="flex gap-5 mt-8">
        <a 
          href="/files/CV Naufal Altaf.pdf"
          download
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-2xl font-medium hover:border-primary hover:text-primary duration-200"
        >
          <HiOutlineDocumentText className="w-5 h-5" />
          <span className="font-semibold">Curriculum Vitae (CV)</span>
        </a>
        <a 
          href="/files/nawo-ssh.pub"
          download
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-2xl font-medium hover:border-primary hover:text-primary duration-200"
        >
          <HiOutlineLockClosed className="w-5 h-5" />
          <span className="font-semibold">SSH Key</span>
        </a>
        <a 
          href="/files/nawo-gpg.pub"
          download
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-2xl font-medium hover:border-primary hover:text-primary duration-200"
        >
          <HiOutlineShieldCheck className="w-5 h-5" />
          <span className="font-semibold">GPG Key</span>
        </a>
      </div>
    </div>
  );
}
