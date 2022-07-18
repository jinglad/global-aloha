import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";

type PropsType = {
  item: any;
  type:string;
  myGroup?: boolean;
}

const Card = ({ item, type, myGroup }: PropsType) => {
  const router = useRouter();
  return (
    <div
      className="shadow shadow-blue-500/40 p-3 rounded overflow-hidden cursor-pointer"
      onClick={() =>
        type === "groups"
          ? router.push(`/groups/${item.Id}/overview`)
          : router.push(`library/${item.Id}`)
      }
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
          <p className="m-0 text-lg font-semibold">{item.Title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
