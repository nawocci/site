'use client';

import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight, atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'; // Both themes
import CopyButton from './CopyButton';

interface CodeBlockProps {
    value: {
        filename?: string;
        language?: string;
        code: string;
    };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value }) => {
    // State to track dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect the user's dark mode preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches); // Set initial state

        // Listen for changes in preference
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup listener on unmount
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className="my-4 overflow-hidden rounded-md">
            {value.filename && (
                <div className="bg-backgroundAlt text-text p-2 text-sm flex items-center justify-between border-b border-border">
                    <span className="truncate mr-2">{value.filename}</span>
                    <CopyButton text={value.code} />
                </div>
            )}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={value.language || 'text'}
                    style={isDarkMode ? atomOneDark : atomOneLight} // Dynamically apply dark or light theme
                    customStyle={{
                        margin: 0,
                        backgroundColor: isDarkMode ? '#1E1E1E' : 'var(--color-background-alt)', // Custom background colors
                        fontSize: '0.875rem',
                        padding: '1rem',
                    }}
                    wrapLongLines
                >
                    {value.code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;