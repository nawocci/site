'use client';

import { FileItem } from '@/types/FileItem';
import { File } from './File';
import { Folder } from './Folder';

interface FileExplorerProps {
  items: FileItem[];
}

export function FileExplorer({ items }: FileExplorerProps) {
  if (!items || items.length === 0) {
    return <div className="text-secondary italic">No items found</div>;
  }

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const isFolder = Boolean(item.folder);
        
        return (
          <div key={item.id}>
            {isFolder ? (
              <Folder item={item} />
            ) : (
              <File item={item} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FileExplorer; 