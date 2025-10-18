'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { HiOutlineClipboard, HiOutlineClipboardCheck } from 'react-icons/hi';

interface CodeBlockProps {
  language?: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 relative group">
      {language && (
        <div className="bg-[#FFD4C4] dark:bg-[#4A2D24] px-4 py-2 rounded-t-lg text-sm font-mono text-[#8B3A1F] dark:text-[#FFB299] flex items-center justify-between">
          <span>{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-black/10 dark:hover:bg-white/10 duration-200 cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <>
                <HiOutlineClipboardCheck className="w-4 h-4" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <HiOutlineClipboard className="w-4 h-4" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      {!language && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2 py-1 rounded bg-[#FFD4C4] dark:bg-[#4A2D24] text-[#8B3A1F] dark:text-[#FFB299] opacity-0 group-hover:opacity-100 hover:bg-opacity-80 duration-200 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <HiOutlineClipboardCheck className="w-4 h-4" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <HiOutlineClipboard className="w-4 h-4" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      )}
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: language ? '0 0 0.5rem 0.5rem' : '0.5rem',
          fontSize: '0.875rem',
        }}
        showLineNumbers
      >
        {code || ''}
      </SyntaxHighlighter>
    </div>
  );
}
