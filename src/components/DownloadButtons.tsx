'use client';

import { useState } from 'react';
import { HiOutlineDocumentText, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi2";

export default function DownloadButtons() {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const CV_URL = "/files/CV Naufal Altaf.pdf";  
  const SSH_URL = "/files/nawo-ssh.pub";
  const GPG_URL = "/files/nawo-gpg.pub";

  return (
    <div className="w-full max-w-md mt-4 sm:mt-8">
      <div className="sm:hidden w-full">
        <a 
          href={CV_URL}
          download
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-md font-medium mb-2"
        >
          <HiOutlineDocumentText className="w-5 h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Download CV</span>
        </a>
        
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full flex items-center justify-between px-4 py-3 border border-primary text-primary rounded-md font-medium"
        >
          <span className="flex items-center gap-2">
            <HiOutlineLockClosed className="w-5 h-5 flex-shrink-0" />
            <span className="whitespace-nowrap">Credentials</span>
          </span>
          {showDropdown ? 
            <HiOutlineChevronUp className="w-5 h-5 flex-shrink-0" /> : 
            <HiOutlineChevronDown className="w-5 h-5 flex-shrink-0" />
          }
        </button>
        
        {showDropdown && (
          <div className="mt-2 flex flex-col gap-2 animate-fadeIn">
            <a 
              href={SSH_URL}
              download
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-primary text-primary rounded-md font-medium"
            >
              <HiOutlineLockClosed className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">SSH Key</span>
            </a>
            <a 
              href={GPG_URL}
              download
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-primary text-primary rounded-md font-medium"
            >
              <HiOutlineShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">GPG Key</span>
            </a>
          </div>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-row gap-5">
        <a 
          href={CV_URL}
          download
          className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-md font-medium lg:hover:brightness-75 duration-200"
        >
          <HiOutlineDocumentText className="w-5 h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Download CV</span>
        </a>
        <a 
          href={SSH_URL}
          download
          className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border border-primary text-primary rounded-md font-medium lg:hover:border-black lg:dark:border-white lg:hover:text-black lg:dark:text-white duration-200"
        >
          <HiOutlineLockClosed className="w-5 h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">SSH Key</span>
        </a>
        <a 
          href={GPG_URL}
          download
          className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border border-primary text-primary rounded-md font-medium lg:hover:border-black lg:dark:border-white lg:hover:text-black lg:dark:text-white duration-200"
        >
          <HiOutlineShieldCheck className="w-5 h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">GPG Key</span>
        </a>
      </div>
    </div>
  );
}