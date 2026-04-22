"use client";

import React, { useState } from "react";
import { FiLink, FiCheck } from "react-icons/fi";

type LinkedHeaderProps = {
  level: 2 | 3 | 4;
  id: string;
  children: React.ReactNode;
};

export default function LinkedHeader({ level, id, children }: LinkedHeaderProps) {
  const [copied, setCopied] = useState(false);
  const Tag = `h${level}` as "h2" | "h3" | "h4";

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tag id={id} className="group relative scroll-mt-24">
      {/* Desktop Link Button */}
      <button
        onClick={handleCopy}
        aria-label="Copy link to section"
        className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center p-1 text-foreground/40 hover:text-primary transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
      >
        {copied ? (
          <FiCheck className="h-4 w-4 text-green-500" />
        ) : (
          <FiLink className="h-4 w-4" />
        )}
      </button>

      {/* Mobile-friendly Hyperlink */}
      <a 
        href={`#${id}`} 
        className="no-underline text-inherit hover:text-primary transition-colors block lg:inline-block"
      >
        {children}
      </a>
    </Tag>
  );
}
