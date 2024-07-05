import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="shadow bg-[#131518]">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link
          href="/pool"
          className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
        >
          Pool
        </Link>

        <Link
          href="/"
          className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
        >
          Transfer
        </Link>

        <Link
          href="/tokens"
          className="text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6"
        >
          Tokens
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
