import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";

type PropsType = {
  item: any;
  type: string;
  myGroup?: boolean;
  myLibrary?: boolean;
};

const Card = ({ item, type, myGroup, myLibrary }: PropsType) => {
  const router = useRouter();

  return (
    <div
      className="shadow shadow-blue-500/40 p-3 rounded overflow-hidden cursor-pointer"
      onClick={() => {
        if (type === "groups") {
          router.push(`/groups/${item.Id}/overview`).then();
        } else if(item?.ModuleName === 'ga-group') {
          router.push(`/groups/${item.ModuleId}/overview`).then();
        } else if(type === 'search' && item?.ModuleName !== 'ga-group'){
          router.push(`/library/${item.ModuleId}/overview`).then();
        } else {
          myLibrary
            ? router.push(`/library/${item.Id}/overview`).then()
            : router.push(`/library/${item.ActivityId}/overview`).then();
        }
      }}
    >
      <div className="h-60">
        <img
          src={item.Photo || "/images/thumbnail-default.jpeg"}
          alt="Sample Image"
          className="rounded w-full h-full"
        />
      </div>
      <div className="flex items-center mb-3">
        <div className="cursor-pointer">
          <p className="m-0 text-lg font-semibold">{type === 'search' ? item?.Name : item.Title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
