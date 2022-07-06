import Link from "next/link";
import React from "react";

const AppHeader = () => {
  return (
    <div className="py-5 bg-black px-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="text-3xl text-white">Global Aloha</a>
            </Link>
          </div>
          <div>
            <Link href="/library">
              <a className="text-md mr-5 text-white">Activity Library</a>
            </Link>
            <Link href="">
              <a className="text-md text-white">Groups</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
