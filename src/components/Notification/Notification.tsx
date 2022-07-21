import Link from "next/link";
import React, { useEffect } from "react";
import useToken from "../../hooks/useToken";
import { getNotification } from "../../request/getNotification";

type PropsType = {
  type: string;
};

const Notification = ({ type }: PropsType) => {
  const token = useToken();

  // useEffect(() => {
  //   if (type === "notification") {
  //     getNotification(token);
  //   } else {
  //     getRequest();
  //   }
  // }, [token]);

  return (
    <>
      <div>
        <Link href="/notifications">
          <a className="text-black p-3 rounded hover:bg-slate-500 ">
            Notifications
          </a>
        </Link>
        <Link href="/requests">
          <a className="text-black p-3 rounded hover:bg-slate-500 ">
            Notifications
          </a>
        </Link>
      </div>
    </>
  );
};

export default Notification;
