import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyGroup } from "../../request/getMyGroup";
import Card from "../Reused/Card/Card";

const MyGroup = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);

  const { globalAccessToken, user } = useSelector((state: any) => state.user);
  const { myGroup } = useSelector((state: any) => state.library);

  useEffect(() => {
    getMyGroup(dispatch, page, size, globalAccessToken, user.UserId);
  }, []);

  return (
    <>
      <Head>
        <title>Global Aloha | My Groups</title>
      </Head>
      <div className="container mx-auto mt-5">
        <div className="bg-gray-200 h-48 w-full rounded relative">
          <div className="absolute top-12 left-12">
            <h2 className="font-bold text-xl">My Group</h2>
            <p>Classes, Clubs, Organizations {"&"} More!</p>
          </div>
        </div>
        <div className="mt-5 grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {myGroup?.map((item: any) => (
            <Card key={item.Id} item={item} type="library" />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyGroup;
