'use client';

import { useEffect, useState } from 'react';
import FileExplorer from '@/app/(site)/components/FileExplorer/FileExplorer';
import { FileItem } from '@/types/FileItem';

export default function Drive() {
  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriveItems = async () => {
      try {
        const response = await fetch(`/api/drive?userId=${process.env.NEXT_PUBLIC_GRAPH_USER_ID}`);
        const data = await response.json();
        setItems(data.value);
      } catch (error) {
        console.error('Error fetching drive items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriveItems();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center animate-fadeIn">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full space-y-10 animate-fadeIn">
      <h1 className="text-4xl sm:text-6xl font-bold">Drive</h1>
      <div className="w-full rounded-lg border border-border p-4 sm:p-6">
        <FileExplorer items={items} />
      </div>
    </main>
  );
}