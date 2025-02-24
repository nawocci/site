'use client';

import { useState } from "react";
import { DriveItem } from "@/types/OneDrive";
import Folder from "./Folder";
import File from "./File";

interface FolderViewProps {
  items: DriveItem[];
  userId: string;
}

export default function FolderView({ items, userId }: FolderViewProps) {
  const [cache, setCache] = useState<Record<string, { data: DriveItem[]; timestamp: number; }>>({});

  const handleCacheUpdate = (id: string, data: DriveItem[], timestamp: number) => {
    setCache(prev => ({
      ...prev,
      [id]: { data, timestamp },
    }));
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <div key={item.id}>
          {item.folder ? (
            <Folder
              item={item}
              userId={userId}
              cache={cache}
              onCacheUpdate={handleCacheUpdate}
            />
          ) : (
            <File item={item} />
          )}
        </div>
      ))}
    </div>
  );
} 