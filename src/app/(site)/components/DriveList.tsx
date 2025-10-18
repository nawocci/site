'use client';

import { useState, useMemo } from 'react';
import { HiOutlineFolder, HiOutlineDocument, HiOutlineChevronRight, HiOutlineChevronDown, HiArrowUp, HiArrowDown } from 'react-icons/hi';

interface DriveItem {
  id: string;
  name: string;
  folder?: any;
  file?: any;
  size?: number;
  webUrl?: string;
  '@microsoft.graph.downloadUrl'?: string;
}

interface FileItemProps {
  item: DriveItem;
  onFolderClick: (itemId: string) => void;
  expandedFolders: Set<string>;
  allItems: Record<string, DriveItem[]>;
  sortBy: 'name' | 'size';
  sortOrder: 'asc' | 'desc';
  isLast?: boolean;
  isFirst?: boolean;
}

function FileItem({ item, onFolderClick, expandedFolders, allItems, sortBy, sortOrder, isLast, isFirst }: FileItemProps) {
  const isFolder = !!item.folder;
  const isExpanded = expandedFolders.has(item.id);
  const children = allItems[item.id];

  // Apply sort to children
  const sortedChildren = useMemo(() => {
    if (!children) return null;
    
    const sorted = [...children];
    
    // Apply sort
    sorted.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'size') {
        // Folders first, then by size
        if (a.folder && !b.folder) return -1;
        if (!a.folder && b.folder) return 1;
        comparison = (b.size || 0) - (a.size || 0);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [children, sortBy, sortOrder]);

  const handleClick = () => {
    if (isFolder) {
      onFolderClick(item.id);
    } else if (item['@microsoft.graph.downloadUrl']) {
      // Download file using direct download URL
      window.open(item['@microsoft.graph.downloadUrl'], '_blank');
    }
  };

  return (
    <div>
      <div 
        className="flex items-center gap-3 py-3 px-4 hover:bg-border cursor-pointer"
        onClick={handleClick}
      >
        {isFolder ? (
          isExpanded ? 
            <HiOutlineChevronDown className="w-5 h-5" /> : 
            <HiOutlineChevronRight className="w-5 h-5" />
        ) : (
          <HiOutlineChevronRight className="w-5 h-5 text-gray-400" />
        )}
        {isFolder ? (
          <HiOutlineFolder className="w-6 h-6 text-primary" />
        ) : (
          <HiOutlineDocument className="w-6 h-6" />
        )}
        <span className="flex-1 text-base">{item.name}</span>
        {item.size && <span className="text-base text-gray-400">{formatBytes(item.size)}</span>}
      </div>
      {isFolder && isExpanded && sortedChildren && (
        <div className={`ml-6 ${!isLast ? 'border-l-2 border-border' : ''}`}>
          {sortedChildren.map((child, index) => (
            <FileItem 
              key={child.id} 
              item={child} 
              onFolderClick={onFolderClick}
              expandedFolders={expandedFolders}
              allItems={allItems}
              sortBy={sortBy}
              sortOrder={sortOrder}
              isFirst={index === 0}
              isLast={index === sortedChildren.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

interface DriveListProps {
  initialItems: DriveItem[];
}

export default function DriveList({ initialItems }: DriveListProps) {
  const [items, setItems] = useState<Record<string, DriveItem[]>>({ root: initialItems });
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleFolderClick = async (folderId: string) => {
    if (expandedFolders.has(folderId)) {
      // Collapse folder
      const newExpanded = new Set(expandedFolders);
      newExpanded.delete(folderId);
      setExpandedFolders(newExpanded);
    } else {
      // Expand folder
      if (!items[folderId]) {
        // Fetch folder contents
        setLoading(new Set(loading).add(folderId));
        try {
          const response = await fetch(`/api/drive?itemId=${folderId}`);
          const data = await response.json();
          setItems({ ...items, [folderId]: data });
        } catch (error) {
          console.error('Error loading folder:', error);
        }
        setLoading((prev) => {
          const newLoading = new Set(prev);
          newLoading.delete(folderId);
          return newLoading;
        });
      }
      
      const newExpanded = new Set(expandedFolders);
      newExpanded.add(folderId);
      setExpandedFolders(newExpanded);
    }
  };

  const sortedItems = useMemo(() => {
    const sorted = [...items.root];
    
    // Apply sort
    sorted.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'size') {
        // Folders first, then by size
        if (a.folder && !b.folder) return -1;
        if (!a.folder && b.folder) return 1;
        comparison = (b.size || 0) - (a.size || 0);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [items.root, sortBy, sortOrder]);

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-6">
        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="text-base font-medium">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('name')}
              className={`px-4 py-2 rounded-2xl border-2 transition-colors cursor-pointer ${
                sortBy === 'name' 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-foreground hover:bg-border'
              }`}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy('size')}
              className={`px-4 py-2 rounded-2xl border-2 transition-colors cursor-pointer ${
                sortBy === 'size' 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-foreground hover:bg-border'
              }`}
            >
              Size
            </button>
          </div>
        </div>

        {/* Sort Order */}
        <div className="flex items-center gap-3">
          <span className="text-base font-medium">Order:</span>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 rounded-2xl border-2 border-foreground hover:bg-border transition-colors cursor-pointer flex items-center gap-2"
          >
            {sortOrder === 'asc' ? (
              <>
                <HiArrowUp className="w-4 h-4" />
                Ascending
              </>
            ) : (
              <>
                <HiArrowDown className="w-4 h-4" />
                Descending
              </>
            )}
          </button>
        </div>
      </div>

      {/* File list */}
      <div className="border-2 border-border rounded-2xl overflow-hidden">
        {sortedItems.map((item, index) => (
          <FileItem 
            key={item.id} 
            item={item} 
            onFolderClick={handleFolderClick}
            expandedFolders={expandedFolders}
            allItems={items}
            sortBy={sortBy}
            sortOrder={sortOrder}
            isFirst={index === 0}
            isLast={index === sortedItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
