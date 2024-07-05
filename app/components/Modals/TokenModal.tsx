import React from "react";
const TokenModal = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer px-4 py-2 justify-between bg-[#1F2428] md:p-4 rounded-xl font-medium text-white w-full animate-pulse">
      <div className="flex items-center justify-center gap-2">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="flex flex-col gap-1">
          <div className="w-24 h-4 bg-gray-600 rounded"></div>
          <div className="w-16 h-3 bg-gray-600 rounded"></div>
        </div>
      </div>
      <div className="w-4 h-4 bg-gray-600 rounded"></div>
    </div>
  );
};

export default TokenModal;
