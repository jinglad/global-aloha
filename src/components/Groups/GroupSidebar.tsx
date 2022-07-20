import { useRouter } from "next/router";
import React from "react";

const GroupSidebar = ({ data, type }: any) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="">
      {type !== "library" ? (
        <>
          <div className="bg-gray-200 w-60 mt-5 p-3">
            <p
              onClick={() => router.push(`/groups/${id}/overview`)}
              className="group-details-sidebar-menu"
            >
              Overview
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
        </>
      ) : (
        <>
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
            {data?.IsCurrentUserManager && (
              <p
                onClick={() => router.push(`/library/${id}/settings`)}
                className="group-details-sidebar-menu"
              >
                Edits
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupSidebar;
