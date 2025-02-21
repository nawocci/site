import { useState } from 'react';
import { HiChevronRight, HiChevronDown, HiFolder } from 'react-icons/hi';
import { FileItem } from '@/types/FileItem';
import { FileExplorer } from './FileExplorer';

interface FolderProps {
  item: FileItem;
}

export const Folder = ({ item }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = !item.children || item.children.length === 0;

  return (
    <div className="space-y-1">
      <div
        className={`flex items-center gap-2 sm:gap-3 w-full p-2 sm:p-3 rounded-md transition-colors
          ${isEmpty ? 'opacity-50' : 'lg:hover:bg-backgroundAlt cursor-pointer'}`}
        onClick={() => !isEmpty && setIsOpen(!isOpen)}
      >
        {!isEmpty && (
          isOpen ? <HiChevronDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
        {isEmpty && <div className="w-4 sm:w-5" />}
        <HiFolder className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        <span className="text-base sm:text-lg flex-grow truncate">
          {item.name}
        </span>
        {isEmpty && (
          <span className="text-xs sm:text-sm text-secondary italic whitespace-nowrap">(empty)</span>
        )}
      </div>
      {isOpen && !isEmpty && (
        <div className="ml-4 sm:ml-6">
          <FileExplorer items={item.children || []} />
        </div>
      )}
    </div>
  );
}; 