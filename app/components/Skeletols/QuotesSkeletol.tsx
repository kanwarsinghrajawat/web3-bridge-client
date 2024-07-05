import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const QuotesSkeletol = () => {
  return (
    <div className="p-6 bg-[#1B1F22] rounded-xl shadow animate-pulse flex justify-between items-center">
      <div className="bg-gray-500 h-2 w-20"></div>

      <div className="flex gap-3">
        <div className="flex items-center">
          <div className="bg-gray-500 rounded-full h-8 w-8 mr-2"></div>
        </div>
        <div>
          <div className="bg-gray-500 h-3 w-24 mb-1"></div>
          <div className="bg-gray-500 h-2 w-20"></div>
        </div>

        <div className=" h-8 w-8 rounded-full flex items-center justify-center">
          <IoIosArrowDown color="gray" />
        </div>
      </div>
    </div>
  );
};

export default QuotesSkeletol;
