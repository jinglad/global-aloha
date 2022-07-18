import React from "react";

const DetailsHeader = ({ data }: any) => {
  return (
    <>
      <div className="h-60 w-full rounded relative overflow-hidden">
        <img
          src={
            data?.Properties?.[0]?.Value
              ? data?.Properties?.[0]?.Value
              : "/images/default-cover.png"
          }
          alt={data?.Properties?.[0]?.Key}
          className="w-full rounded object-cover h-full"
        />
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-20 h-20 mr-3">
          <img
            src={data?.Properties?.[1]?.Value}
            alt={data?.Properties?.[1]?.Key}
            className="w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg m-0">{data?.Title}</h3>
          <p className="m-0">{data?.Properties?.[3]?.Value}</p>
        </div>
      </div>
    </>
  );
};

export default DetailsHeader;
