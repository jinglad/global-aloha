import React from "react";

type ProfileInfoProps = {
  firstName: string;
  lastName: string;
  about: string;
  shortBio: string;
};

const PersonalInfo = ({
  firstName,
  lastName,
  about,
  shortBio,
}: ProfileInfoProps) => {
  // console.log(shortBio);
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-2/5">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            className="py-3 px-2 bg-gray-100 rounded w-full"
          />
        </div>
        <div className="w-2/5">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            className="py-3 px-2 bg-gray-100 rounded w-full"
          />
        </div>
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="About"
          value={about}
          className="py-3 px-2 bg-gray-100 rounded w-full"
        />
      </div>
      <div className="mt-3">
        <p
          className="m-0 p-2 pb-1 bg-gray-100 align-middle leading-9 h-14 rounded"
          dangerouslySetInnerHTML={{ __html: shortBio }}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
