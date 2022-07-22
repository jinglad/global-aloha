import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LibrarySidebar = ({ data }: any) => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {}, [id]);

  return (
    <div className="bg-gray-200 w-60 mt-5 p-3">
      <p
        onClick={() => router.push(`/library/${id}/overview`)}
        className="group-details-sidebar-menu"
      >
        Summery
      </p>
      <p
        onClick={() => router.push(`/library/${id}/members`)}
        className="group-details-sidebar-menu"
      >
        Members
      </p>
      {data?.HasManagerPrivileges && (
        <p
          onClick={() => router.push(`/library/${id}/settings`)}
          className="group-details-sidebar-menu"
        >
          Edits
        </p>
      )}
    </div>
  );
};

export default LibrarySidebar;
