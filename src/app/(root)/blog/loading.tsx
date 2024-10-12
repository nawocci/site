import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 sm:space-y-10 animate-fadeIn">
      <div className="h-20 flex items-center">
        <div className="w-48 h-12 sm:h-16 bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col h-58 rounded-lg border-[1px] border-border overflow-hidden animate-pulse">
            <div className="h-40 lg:h-56 bg-gray-700"></div>
            <div className="flex flex-col flex-grow p-2 lg:p-4">
              <div className="w-24 h-4 lg:h-6 bg-gray-700 mb-1 lg:mb-2"></div>
              <div className="w-full h-6 lg:h-8 bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
