'use client';

import { FileItem } from '@/types/FileItem';
import { File } from './File';
import { Folder } from './Folder';

interface FileExplorerProps {
  items: FileItem[];
}

export function FileExplorer({ items }: FileExplorerProps) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item.id}>
          {item.type === 'folder' ? (
            <Folder item={item} />
          ) : (
            <File item={item} />
          )}
        </div>
      ))}
    </div>
  );
}

export default FileExplorer; 