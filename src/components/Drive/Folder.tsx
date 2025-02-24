'use client';

import { useState, useCallback, useRef, useEffect } from "react";
import { DriveItem } from "@/types/OneDrive";
import { FaFolder, FaChevronDown, FaChevronRight } from "react-icons/fa";
import File from "./File";

interface FolderProps {
  item: DriveItem;
  userId: string;
  cache: Record<string, { data: DriveItem[]; timestamp: number; }>;
  onCacheUpdate: (id: string, data: DriveItem[], timestamp: number) => void;
}

interface FetchError extends Error {
  name: string;
}

export default function Folder({ item, userId, cache, onCacheUpdate }: FolderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contents, setContents] = useState<DriveItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchContents = useCallback(async () => {
    const now = Date.now();
    const cachedData = cache[item.id];
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
      setContents(cachedData.data);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/drive?path=${encodeURIComponent(item.id)}&userId=${userId}`,
        { signal: controller.signal }
      );
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch folder contents');
      }

      const data = await response.json();
      const items = data.value || [];
      setContents(items);
      onCacheUpdate(item.id, items, now);
    } catch (error: unknown) {
      const fetchError = error as FetchError;
      if (fetchError.name === 'AbortError') return;
      console.error("Error fetching folder contents:", fetchError);
      setError('Failed to load folder contents');
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [item.id, userId, cache, onCacheUpdate]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const toggleFolder = async () => {
    if (!isExpanded) {
      setIsExpanded(true);
      await fetchContents();
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <div>
      <button
        onClick={toggleFolder}
        className="flex items-center gap-2 hover:text-primary p-2 transition-colors duration-200 w-full text-left group"
      >
        <span className="transition-transform duration-200 transform group-hover:scale-110">
          {isExpanded ? (
            <FaChevronDown className="w-4 h-4 flex-shrink-0" />
          ) : (
            <FaChevronRight className="w-4 h-4 flex-shrink-0" />
          )}
        </span>
        <FaFolder className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{item.name}</span>
        {item.folder && item.folder.childCount > 0 && (
          <span className="text-xs text-secondary">({item.folder.childCount})</span>
        )}
      </button>
      
      {isExpanded && (
        <div className="ml-4">
          {isLoading ? (
            <div className="p-2 ml-6 text-primary text-sm animate-pulse">Loading contents...</div>
          ) : error ? (
            <div className="p-2 text-red-500 text-sm">{error}</div>
          ) : contents.length === 0 ? (
            <div className="p-2 text-secondary text-sm">Empty folder</div>
          ) : (
            contents.map((item) => (
              <div key={item.id}>
                {item.folder ? (
                  <Folder
                    item={item}
                    userId={userId}
                    cache={cache}
                    onCacheUpdate={onCacheUpdate}
                  />
                ) : (
                  <File item={item} />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
