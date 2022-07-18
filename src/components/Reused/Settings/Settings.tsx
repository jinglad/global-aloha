import React from "react";
import GroupSidebar from "../../Groups/GroupSidebar";
import DetailsHeader from "../DetailsHeader/DetailsHeader";

const Settings = ({ data }: any) => {
  console.log({data})
  return (
    <div className="w-3/5 mx-auto mt-5">
      <div>
        <DetailsHeader data={data} />
        <div className="relative flex">
          <div>
            <GroupSidebar data={data} />
          </div>
          <div className="ml-10 border-l-2 border-gray-200 pl-2 pb-2 w-full">
            <div className="">
              <h2 className="font-bold text-xl">Group Title</h2>
              <div>
                <input
                  type="text"
                  value={data?.Title}
                  className="p-3 bg-gray-200 outline-none rounded w-3/5"
                />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="font-bold text-xl">Group Slogan</h2>
              <div>
                <input
                  type="text"
                  value={data?.Title}
                  className="p-3 bg-gray-200 outline-none rounded w-3/5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
