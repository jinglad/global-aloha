import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyActivity } from "../../request/getMyActivity";
import Card from "../Reused/Card/Card";

const MyActivity = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);

  const { globalAccessToken, user } = useSelector((state: any) => state.user);
  const { myLibrary } = useSelector((state: any) => state.library);

  useEffect(() => {
    getMyActivity(dispatch, page, size, globalAccessToken, user.UserId);
  }, []);

  return (
    <>
      <Head>
        <title>Global Aloha | My Activity</title>
      </Head>
      <div className="container mx-auto mt-5">
        <div className="bg-gray-200 h-48 w-full rounded relative">
          <div className="absolute top-12 left-12">
            <h2 className="font-bold text-xl">My Activity</h2>
            <p>Includes Projects, Companies, Internships {"&"} Contests</p>
          </div>
        </div>
        <div className="mt-5 grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {myLibrary?.map((item: any) => (
            <Card key={item.Id} item={item} type="library" />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyActivity;
