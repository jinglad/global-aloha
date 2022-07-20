import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getGroupsList } from "../../request/getGroupsList";
import Card from "../Reused/Card/Card";
import Loader from "../Reused/Loader/Loader";

const Groups = () => {
  const [categoryTitle, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const {groups} = useSelector((state:any) => state.library)

  const dispatch = useDispatch();

  useEffect(() => {
    getGroupsList(dispatch, 12, 0, setLoading);
  }, []);

  return (
    <>
    <Head>
      <title>Global Aloha | Groups</title>
    </Head>
      <div className="flex">
      <div className="w-80 mr-5">
        <div className="bg-slate-300 h-screen overflow-auto sticky top-0">
          <div className="py-5">
            <h1 className="ml-10 font-semibold text-xl">Filter</h1>
            <div className="ml-12">
              <p
                onClick={() => setCategory("")}
                className={
                  categoryTitle === ""
                    ? "cursor-pointer bg-blue-500 w-36 py-2 px-3 rounded mt-0 mb-1 text-white"
                    : "cursor-pointer mt-0 mb-1 hover:bg-blue-500 w-36 py-2 px-3 rounded hover:text-white"
                }
              >
                All
              </p>
              <p
                className={
                  categoryTitle === "featured"
                    ? "cursor-pointer bg-blue-500 w-36 py-2 px-3 rounded mt-0 mb-1 text-white"
                    : "cursor-pointer mt-0 mb-1 hover:bg-blue-500 w-36 py-2 px-3 rounded hover:text-white"
                }
                onClick={() => {
                  setCategory("featured");
                }}
              >
                Featured
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-fit py-5 pr-2">
        {loading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Loader />
          </div>
        ) : (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {groups?.map((item: any) => {
              return <Card key={item.ActivityId} item={item} type="groups" />;
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Groups;
