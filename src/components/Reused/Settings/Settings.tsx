import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { token } from "../../../utils/utils";
import GroupSidebar from "../../Groups/GroupSidebar";
import DetailsHeader from "../DetailsHeader/DetailsHeader";
import Loader from "../Loader/Loader";

const Settings = ({ data, setUpdate }: any) => {
  const [slogan, setSlogan] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [loader, setLoader] = useState(false);
  // const [data, setData] = useState(item);

  const setValue = (key:string) => {
    const newItem = data?.Properties?.find((item:any) => item.Key === key);
    return newItem;
  }

  useEffect(() => {
    const des = setValue("description");
    setDescription(des?.Value || "");

    const slog = setValue("visionHeadline");
    setSlogan(slog?.Value || "")
    
    setTitle(data?.Title);
  }, [data]);

  const handleUpdate = async () => {
    const newProp = [...data?.Properties];

    const sloganIndex = data?.Properties?.findIndex(
      (item: any) => item.Key === "visionHeadline"
    );
    if (sloganIndex >= 0) {
      newProp[sloganIndex].Value = slogan;
    } else {
      newProp.push({ Key: "visionHeadline", Value: slogan });
    }

    const desIndex = data?.Properties?.findIndex(
      (item: any) => item.key === "description"
    );
    if (desIndex >= 0) {
      newProp[desIndex].Value = description;
    } else {
      newProp.push({ Key: "description", Value: description });
    }

    const updatedBody = {
      GroupId: data?.GroupId,
      GroupPrivacy: data?.GroupPrivacy,
      ModuleKey: data?.ModuleKey,
      ParentModuleId:
        data?.ParentGroup?.ParentGroupId || data?.ParentGroup?.PendingParentId,
      Properties: newProp,
      PublishToLibrary: data?.PublishToLibrary,
      TimeZone: data?.TimeZone,
      TimeZoneOffset: data?.TimeZoneOffset,
      Title: title,
    };
    setLoader(true);
    const response = await fetch(
      `https://api-gagroupservice-dev.saams.xyz/api/v1/group`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBody),
      }
    );

    setLoader(false);

    if (response.ok) {
      const res = await response.json();
      setUpdate((prev:any) => prev + 1);
    }
    // console.log({updatedBody})
  };

  return (
    <div className="w-3/5 mx-auto mt-5">
      <div>
        <DetailsHeader data={data} />
        <div className="relative flex">
          <div>
            <GroupSidebar data={data} />
          </div>
          <div className="ml-10 border-l-2 border-gray-200 pl-2 pb-2 w-full">
            {loader ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <Loader />
              </div>
            ) : (
              <>
                <div className="">
                  <h2 className="font-bold text-xl">Group Title</h2>
                  <div>
                    <input
                      type="text"
                      value={title}
                      className="p-3 bg-gray-200 outline-none rounded w-3/5"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="font-bold text-xl">Group Slogan</h2>
                  <div>
                    <input
                      type="text"
                      name="visionHeadline"
                      value={slogan}
                      className="p-3 bg-gray-200 outline-none rounded w-3/5"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSlogan(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="font-bold text-xl">Group Description</h2>
                  <div>
                    <input
                      type="text"
                      value={description}
                      name="description"
                      className="p-3 bg-gray-200 outline-none rounded w-3/5"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(e.target.value)
                      }
                    />
                  </div>
                </div>
                <Button type="primary" className="mt-4" onClick={handleUpdate}>
                  Update
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
