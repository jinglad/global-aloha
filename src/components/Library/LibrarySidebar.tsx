import { useRouter } from "next/router";
import React from "react";

const LibrarySidebar = ({ data }: any) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="">
      <div className="bg-gray-200 w-60 mt-5 p-3">
        <p
          onClick={() => router.push(`/groups/${id}/overview`)}
          className="group-details-sidebar-menu"
        >
          Summery
        </p>
        <p
          onClick={() => router.push(`/groups/${id}/members`)}
          className="group-details-sidebar-menu"
        >
          Members
        </p>
        {data?.IsCurrentUserManager && (
          <p
            onClick={() => router.push(`/groups/${id}/settings`)}
            className="group-details-sidebar-menu"
          >
            Edits
          </p>
        )}
      </div>
    </div>
  );
};

export default LibrarySidebar;
