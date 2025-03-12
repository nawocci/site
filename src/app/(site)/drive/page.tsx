'use client';

import { useEffect, useState } from 'react';
import FileExplorer from '@/components/FileExplorer/FileExplorer';
import { FileItem } from '@/types/FileItem';

export default function Drive() {
  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriveItems = async () => {
      try {
        const rootResponse = await fetch(`/api/drive?userId=${process.env.NEXT_PUBLIC_GRAPH_USER_ID}`);
        const rootData = await rootResponse.json();
        
        if (rootData.error) {
          throw new Error(rootData.error);
        }
        
        const indexFolder = rootData.value.find((item: FileItem) => 
          item.name === 'Index' && item.folder
        );
        
        if (indexFolder) {
          const indexResponse = await fetch(`/api/drive?userId=${process.env.NEXT_PUBLIC_GRAPH_USER_ID}&path=${indexFolder.id}`);
          const indexData = await indexResponse.json();
          
          if (indexData.error) {
            throw new Error(indexData.error);
          }
          
          setItems(indexData.value);
        } else {
          setError('Index folder not found. Please create an Index folder in your OneDrive.');
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching drive items:', error);
        setError('Failed to load files. Please try again later.');
        setItems([]);
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
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : items.length > 0 ? (
          <FileExplorer items={items} />
        ) : (
          <div className="text-center py-10">
            <p>No files found in the Index folder.</p>
          </div>
        )}
      </div>
    </main>
  );
}