import React from "react";

const ContactInfo = () => {
  return (
    <>
      <div className="mt-3">
        <input
          type="tel"
          placeholder="Phone"
          // value={firstName}
          className="py-3 px-2 bg-gray-100 rounded w-full"
        />
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Address Line 1"
          // value={lastName}
          className="py-3 px-2 bg-gray-100 rounded w-full"
        />
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Address Line 2"
          // value={about}
          className="py-3 px-2 bg-gray-100 rounded w-full"
        />
      </div>
    </>
  );
};

export default ContactInfo;
