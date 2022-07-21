import React, { useEffect, useState } from "react";

const DetailsHeader = ({ data, type }: any) => {
  const [banner, setBanner] = useState<any>(null);
  const [profileImg, setProfileImg] = useState<any>(null);
  const [slogan, setSlogan] = useState<any>(null);

  useEffect(() => {
    const newBanner = data?.Properties?.find(
      (item: any) => item.Key === "bannerImage"
    );
    setBanner(newBanner);
    const newProfileImg = data?.Properties?.find(
      (item: any) => item.Key === "profileImage"
    );
    setProfileImg(newProfileImg);
    const newSlogan = data?.Properties?.find(
      (item: any) => item.Key === "visionHeadline"
    );
    setSlogan(newSlogan);
  }, [data]);

  return (
    <>
      <div className="h-60 w-full rounded relative overflow-hidden">
        <img
          src={
            type === "library"
              ? data?.CoverPhoto || "/images/default-cover.png"
              : banner?.Value || "/images/default-cover.png"
          }
          alt="Banner Image"
          className="w-full rounded object-cover h-full"
        />
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-20 h-20 mr-3">
          <img
            src={profileImg?.Value}
            alt={profileImg?.Key}
            className="w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg m-0">
            {type === "library" ? data?.Name : data?.Title}
          </h3>
          <p className="m-0">{slogan?.Value}</p>
        </div>
      </div>
    </>
  );
};

export default DetailsHeader;
