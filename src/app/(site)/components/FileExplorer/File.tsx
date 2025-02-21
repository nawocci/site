import { FileItem } from '@/types/FileItem';
import { HiDocument } from 'react-icons/hi';

interface FileProps {
  item: FileItem;
}

export const File = ({ item }: FileProps) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full p-2 sm:p-3 rounded-md transition-colors lg:hover:bg-backgroundAlt">
      <HiDocument className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
      <span className="text-base sm:text-lg flex-grow truncate">
        {item.name}
      </span>
      <span className="text-xs sm:text-sm text-secondary italic whitespace-nowrap">
        ({item.size ? (
          item.size / 1024 / 1024 > 999 
            ? `${(item.size / 1024 / 1024 / 1024).toFixed(1)} GB`
            : `${(item.size / 1024 / 1024).toFixed(1)} MB`
        ) : '0.0 MB'})
      </span>
    </div>
  );
}; 