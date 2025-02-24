'use client';

import { DriveItem } from "@/types/OneDrive";
import { FaFile } from "react-icons/fa";

interface FileProps {
  item: DriveItem;
}

export default function File({ item }: FileProps) {
  const handleFileClick = () => {
    window.open(item.webUrl, '_blank');
  };

  return (
    <button
      onClick={handleFileClick}
      className="flex items-center gap-2 hover:text-primary p-2 ml-6 transition-colors duration-200 w-full text-left"
    >
      <FaFile className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{item.name}</span>
    </button>
  );
}
