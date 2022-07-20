import React, { useEffect, useState } from "react";

const LibraryDetailsHeader = ({data}:any) => {
  const [slogan, setSlogan] = useState<any>(null);

  useEffect(() => {
    const newProp = data?.Properties?.find(
      (item: any) => item.Key === "slogan"
    );
    setSlogan(newProp);
  }, [data]);

  return (
    <>
      <div className="h-60 w-full rounded relative overflow-hidden">
        <img
          src={data?.CoverPhoto || "/images/default-cover.png"}
          alt="Banner Image"
          className="w-full rounded object-cover h-full"
        />
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-20 h-20 mr-3">
          <img
            src={data?.Photo || "/images/avatar-default.jpg"}
            alt="Profile Image"
            className="w-full h-full"
          />
        </div>
        <div>
          <h4 className="font-bold text-lg m-0">{data?.Name}</h4>
          <p className="m-0">{slogan?.Value}</p>
        </div>
      </div>
    </>
  );
};

export default LibraryDetailsHeader;
