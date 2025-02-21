import FileExplorer from '@/app/(site)/components/FileExplorer/FileExplorer';
import { dummyFiles } from '@/app/(site)/components/FileExplorer/dummyData';

export default function Cloud() {
  return (
    <main className="w-full space-y-10 animate-fadeIn">
      <h1 className="text-4xl sm:text-6xl font-bold">Cloud</h1>
      <div className="w-full rounded-lg border border-border p-4 sm:p-6">
        <FileExplorer items={dummyFiles} />
      </div>
    </main>
  );
}