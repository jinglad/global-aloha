import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const MainProfile = () => {
  const { profile } = useSelector((state: any) => state.user);
  return (
    <div className="w-full">
      <div className="">
        <div>
          <img
            src="/images/default-cover.png"
            alt=""
            className="w-full h-72 object-cover"
          />
        </div>
        <div className="flex mt-3 items-center">
          <div className="mr-3">
            <img
              src={
                profile?.profilePhoto
                  ? profile?.profilePhoto
                  : "/images/thumbnail-default.jpeg"
              }
              alt="Profile Picture"
              className="w-20 h-20"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold m-0">{profile?.firstName}{" "}{profile?.lastName}</h4>
            <p className="m-0">{profile?.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
