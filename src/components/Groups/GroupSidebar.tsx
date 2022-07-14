import { useRouter } from "next/router";
import React from "react";

const GroupSidebar = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="">
      <div className="bg-gray-200 w-60 mt-5 p-3">
        <p
          onClick={() => router.push(`/groups/${id}/overview`)}
          className="m-0 font-semibold text-center border-b-2 border-gray-300 text-md cursor-pointer hover:bg-blue-400 rounded p-2 hover:text-white mb-2"
        >
          Overview
        </p>
        <p
          onClick={() => router.push(`/groups/${id}/members`)}
          className="m-0 font-semibold text-center border-b-2 border-gray-300 text-md cursor-pointer hover:bg-blue-400 rounded p-2 hover:text-white mb-2"
        >
          Members
        </p>
        <p
          onClick={() => router.push(`/groups/${id}/settings`)}
          className="m-0 font-semibold text-center border-b-2 border-gray-300 text-md cursor-pointer hover:bg-blue-400 rounded p-2 hover:text-white mb-2"
        >
          Edits
        </p>
      </div>
    </div>
  );
};

export default GroupSidebar;
