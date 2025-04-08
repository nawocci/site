import DownloadButtons from '@/components/DownloadButtons';

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-6 animate-fadeIn">
      <h1 className="text-center text-3xl sm:text-7xl font-semibold">
        Student & Developer<br/>Based in Indonesia
      </h1>
      <p className="text-center text-sm sm:text-lg text-secondary">
        Hi, I&apos;m Naufal Altaf, a passionate Information Systems student and developer. I have interest in<br/>full stack and Android Open Source Project (AOSP) development.
      </p>
        <DownloadButtons />
    </div>
  );
}
