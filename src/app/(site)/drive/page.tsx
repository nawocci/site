import { listDriveItems } from '@/lib/graphClient';
import DriveList from '../components/DriveList';

export default async function Drive() {
  const items = await listDriveItems();

  return (
    <main className="w-full space-y-6 lg:space-y-10 fade-in">
      <h1 className="text-3xl lg:text-6xl font-bold">Drive</h1>
      <DriveList initialItems={items} />
    </main>
  );
}
