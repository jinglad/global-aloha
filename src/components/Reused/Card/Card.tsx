import { Button } from "antd";
import React from "react";

const Card = ({item}:any) => {
  return (
    <div className="shadow shadow-blue-500/40 p-3 rounded">
      <div className="cursor-pointer">
        <img src="/images/sample-image.jpg" alt="Sample Image" className="rounded" />
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="cursor-pointer">
          <p className="m-0 text-lg font-semibold">Activity service</p>
        </div>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="m-0">Service hours</p>
            <p className="m-0">0 (0 limit)</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p className="m-0">Volunteer</p>
            <p className="m-0">1</p>
          </div>
        </div>
      </div>
      <div>
        <Button type="primary" block>Join</Button>
      </div>
    </div>
  );
};

export default Card;
