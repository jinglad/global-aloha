import { Button, Collapse } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ContactInfo from "./ContactInfo";
import PersonalInfo from "./PersonalInfo";

const { Panel } = Collapse;

type ExpandIconPosition = "start" | "end";

const MainProfile = () => {
  const { profile } = useSelector((state: any) => state.user);
  const [expandIconPosition, setExpandIconPosition] =
    useState<ExpandIconPosition>("end");

  const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  return (
    <div className="xl:w-3/5 lg:w-full xl:mx-auto">
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
            <h4 className="text-lg font-bold m-0">
              {profile?.firstName} {profile?.lastName}
            </h4>
            <p className="m-0">{profile?.about}</p>
          </div>
        </div>
        <div className="mt-5">
          <Collapse
            defaultActiveKey={["1"]}
            expandIconPosition={expandIconPosition}
            accordion
          >
            <Panel header="Personal Information" key="1">
              <PersonalInfo
                firstName={profile?.firstName}
                lastName={profile?.lastName}
                about={profile?.about}
                shortBio={profile?.profileData?.shortBio}
              />
            </Panel>
            <Panel header="My Privacy" key="2">
              <div className="mt-3">
                <p>Mask Profile</p>
                <p className="m-0 p-2 pb-1 bg-gray-100 align-middle leading-9 h-14 rounded">
                  <span className="p-2 rounded bg-blue-500 text-white">{profile?.maskSetting === 1 && "Open to all"}</span>
                </p>
              </div>
            </Panel>
            <Panel header="Contact Information" key="3">
              <ContactInfo />
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
