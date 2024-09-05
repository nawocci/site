'use client'

import React, { useState } from 'react'

interface CopyButtonProps {
  text: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 px-2 py-1 text-xs border border-border text-white hover:bg-primary hover:border-transparent hover:text-black rounded transition-colors duration-200"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export default CopyButton
