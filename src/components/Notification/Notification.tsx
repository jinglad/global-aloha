import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNotification } from "../../request/getNotification";

type PropsType = {
  type: string;
};

const Notification = ({ type }: PropsType) => {
  const { globalAccessToken: token, user } = useSelector(
    (state: any) => state.user
  );
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    if (type === "notification") {
      getNotification(token, user?.UserId).then((result) => {
        setNotification(result);
        console.log(result);
      });
    } else {
      // getRequest();
    }
  }, [token, user]);

  return (
    <div className="w-4/5 mx-auto">
      <div>
        <Link href="/notifications">
          <a className="text-black p-3 rounded hover:bg-slate-200 hover:text-black">
            Notifications
          </a>
        </Link>
        <Link href="/requests">
          <a className="text-black p-3 rounded hover:bg-slate-200 hover:text-black">
            Request
          </a>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Notification;
