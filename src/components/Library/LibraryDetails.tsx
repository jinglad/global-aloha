import { Avatar } from "antd";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { getActivityRole } from "../../request/getActivityRole";
import { getBatchMembers } from "../../request/getBatchMembers";
import { globalalohaservice } from "../../services/globalalohaservice";
import GroupSidebar from "../Groups/GroupSidebar";
import LibraryDetailsHeader from "./LibraryDetailsHeader";
import LibrarySidebar from "./LibrarySidebar";

const LibraryDetails = ({ data }: any) => {
  const [slogan, setSlogan] = useState<any>(null);
  const [leaderShip, setLeaderShip] = useState<any>(null);
  const [batchMember, setBatchMember] = useState<any>(null);
  const token = useToken();

  useEffect(() => {
    const newProp = data?.Properties?.find(
      (item: any) => item.Key === "slogan"
    );
    setSlogan(newProp);
  }, [data]);

  useEffect(() => {
    const result = getActivityRole(data?.Id);
    result.then((res) => setLeaderShip(res));

    const member = getBatchMembers(data?.Id, token);
    member.then((res) => setBatchMember(res));
  }, [data]);

  return (
    <>
      <Head>
        <title>Global Aloha | {data?.Name}</title>
      </Head>
      <div className="w-3/5 mx-auto py-3">
        <LibraryDetailsHeader data={data} />
        <div className="flex">
          <div>
            <LibrarySidebar data={data} />
          </div>
          <div className="ml-10 border-l-2 border-gray-200 pl-2 pb-2 mt-3 w-2/4">
            <div>
              <h4 className="text-lg font-bold">Group Description</h4>
              <p className="m-0 text-gray-400">
                {data?.Description || "No Description"}
              </p>
            </div>
            <div className="mt-3">
              <h4 className="text-lg font-bold">Leadership team</h4>
              <div className="m-0 flex flex-wrap gap-3">
                {leaderShip?.map((item: any) => (
                  <div key={item.UserId} className="mr-3 text-center w-16">
                    <Avatar
                      size={64}
                      src={item?.Photo || "https://joeschmoe.io/api/v1/random"}
                    />
                    <p className="m-0 text-sm font-bold truncate w-full">
                      {item.Name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ml-3">
            <h4 className="text-lg font-bold">Member</h4>
            <div className="flex flex-wrap gap-2">
              {batchMember?.map((member: any) => (
                <div key={member?.UserId}>
                  <Avatar
                    size={64}
                    src={member?.Photo || "https://joeschmoe.io/api/v1/random"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryDetails;
