import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { globalalohaservice } from "../../services/globalalohaservice";
import DetailsHeader from "../Reused/DetailsHeader/DetailsHeader";
import Loader from "../Reused/Loader/Loader";
import LibraryDetailsHeader from "./LibraryDetailsHeader";
import LibrarySidebar from "./LibrarySidebar";

const LibrarySettings = ({ data, setUpdate }: any) => {
  const [slogan, setSlogan] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const [properties, setProperties] = useState<any>(null);
  const { globalAccessToken: token } = useSelector((state: any) => state.user);

  useEffect(() => {
    setDescription(data?.Description);
    setTitle(data?.Name);

    const newSlogan = data?.Properties?.find(
      (prop: any) => prop.Key === "slogan"
    );
    setSlogan(newSlogan?.Value);
  }, [data]);

  const handleUpdate = async () => {
    const newProp = [...data?.Properties];

    const sloganIndex = data?.Properties?.findIndex(
      (item: any) => item.Key === "slogan"
    );
    if (sloganIndex >= 0) {
      newProp[sloganIndex].Value = slogan;
    } else {
      newProp.push({ Key: "slogan", Value: slogan });
    }

    const updateObj = {
      Id: data.Id,
      Name: title,
      Cohort: data.Cohort,
      Description: description,
      VideoUrl: data.VideoUrl,
      Slogan: slogan,
      Country: data.Country,
      State: data.State,
      City: data.City,
      PostalCode: data.PostalCode,
      TimeZone: data.TimeZone,
      ClassYearId: data.ClassYearId,
      Facebook: data.FaceBook,
      Twitter: data.Twitter,
      Linkedin: data.Linkedin,
      Youtube: data.Youtube,
      Instagram: data.Instagram,
      MaskSettings: data.MaskSettings,
      PublishToLibrary: data.PublishToLibrary,
      MailingAddress1: data.MailingAddress1,
      MailingAddress2: data.MailingAddress2,
      NumberOfVolunteers: "",
      NumberOfVolunteersLimit: "",
      ServiceHour: "",
      ServiceHourLimit: "",
      SignupGroup: {
        SignupCloseDate: data.SignupCloseDate,
        SignupCloseTime: data.SignupCloseTime,
        SignupOpenDate: data.SignupOpenDate,
        SignupOpenTime: data.SignupOpenTime,
      },
      StartDate: data.StartDate,
      StartTime: data.StartTime,
      EndDate: data.EndDate,
      EndTime: data.EndTime,
      FirstResourceTitle: "",
      FirstResourceLink: "",
      SecondResourceTitle: "",
      SecondResourceLink: "",
      ThirdResourceTitle: "",
      ThirdResourceLink: "",
      Categories: data.Categories,
      ShowMemberLocationOnMap: data.ShowMemberLocationOnMap,
      websites: [
        {
          webLink: "",
        },
      ],
      ActivityImpactGoals: data.ActivityImpactGoals,
      Groups: data.Groups,
      SignupOpenDate: data.SignupOpenDate,
      SignupOpenTime: data.SignupOpenTime,
      SignupCloseDate: data.SignupCloseDate,
      SignupCloseTime: data.SignupCloseTime,
      properties: newProp,
    };

    setLoader(true);

    const response = await fetch(`${globalalohaservice}/v1/activity/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateObj),
    });

    setLoader(false);

    if (response.ok) {
      setUpdate((prev: any) => prev + 1);
    }
  };

  return (
    <div className="w-3/5 mx-auto mt-5">
      <div>
        <LibraryDetailsHeader data={data} />
        <div className="relative flex">
          <div>
            <LibrarySidebar data={data} />
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
                  <h2 className="font-bold text-xl">Activity Title</h2>
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
                  <h2 className="font-bold text-xl">Activity Slogan</h2>
                  <div>
                    <input
                      type="text"
                      name="visionHeadline"
                      value={slogan}
                      className="p-3 bg-gray-200 outline-none rounded w-3/5"
                      placeholder="Short description"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSlogan(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="font-bold text-xl">Activity Description</h2>
                  <div>
                    <input
                      type="text"
                      value={description}
                      name="description"
                      placeholder="Enter description"
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

export default LibrarySettings;
