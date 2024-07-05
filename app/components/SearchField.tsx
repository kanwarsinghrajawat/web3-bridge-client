import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchString } from "../redux/slices/bridge";

const SearchField = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchString(searchTerm));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex rounded-md border-gray-500 overflow-hidden max-w-md mx-auto font-[sans-serif] w-full">
      <input
        type="text"
        placeholder="Search Something..."
        className="w-full outline-none bg-[#1F2428] text-white text-sm px-4 py-3"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        type="button"
        className="flex items-center bg-[#1F2428] justify-center px-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-white"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchField;
