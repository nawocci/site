'use client';

import { useState } from 'react';
import { HiChevronRight, HiChevronDown, HiFolder } from 'react-icons/hi';
import { FileItem } from '@/types/FileItem';
import { FileExplorer } from './FileExplorer';

interface FolderProps {
  item: FileItem;
}

export const Folder = ({ item }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const isEmpty = hasLoaded ? children.length === 0 : item.folder?.childCount === 0;

  const fetchChildren = async () => {
    if (!hasLoaded) {
      setLoading(true);
      try {
        const response = await fetch(`/api/drive?userId=${process.env.NEXT_PUBLIC_GRAPH_USER_ID}&path=${item.id}`);
        const data = await response.json();
        setChildren(data.value);
        setHasLoaded(true);
      } catch (error) {
        console.error('Error fetching folder contents:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClick = async () => {
    if (!isEmpty) {
      if (!hasLoaded) {
        await fetchChildren();
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="space-y-1">
      <div
        className={`flex items-center gap-2 sm:gap-3 w-full p-2 sm:p-3 rounded-md transition-colors
          ${isEmpty ? 'opacity-50' : 'lg:hover:bg-backgroundAlt cursor-pointer'}`}
        onClick={handleClick}
      >
        {loading ? (
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-primary rounded-full animate-spin" />
        ) : (
          <>
            {!isEmpty && (
              isOpen ? <HiChevronDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            {isEmpty && <div className="w-4 sm:w-5" />}
          </>
        )}
        <HiFolder className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        <span className="text-base sm:text-lg flex-grow truncate">
          {item.name}
        </span>
        {isEmpty && (
          <span className="text-xs sm:text-sm text-secondary italic whitespace-nowrap">(empty)</span>
        )}
        {!isEmpty && !hasLoaded && item.folder && (
          <span className="text-xs sm:text-sm text-secondary italic whitespace-nowrap">
            ({item.folder.childCount} items)
          </span>
        )}
      </div>
      {isOpen && !isEmpty && (
        <div className="ml-4 sm:ml-6">
          <FileExplorer items={children} />
        </div>
      )}
    </div>
  );
}; 