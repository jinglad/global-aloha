import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import MainProfile from "./MainProfile";

const Profile = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Global Aloha | Profile</title>
      </Head>
      <div className="flex">
        <div className="w-80 mr-5">
          <div className="bg-slate-300 h-screen overflow-auto sticky top-0">
            <div className="py-5">
              <div className="ml-12 mt-10">
                <div className="flex items-center w-40 hover:bg-blue-400 hover:text-white p-2 rounded cursor-pointer">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                  </div>
                  <p
                    className="text-lg m-0"
                    onClick={() => router.push("/dashboard/my-activity")}
                  >
                    My Activites
                  </p>
                </div>
                <div className="flex items-center mt-3 w-40 hover:bg-blue-400 hover:text-white p-2 rounded cursor-pointer">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <p
                    className="text-lg m-0"
                    onClick={() => router.push("/dashboard/my-group")}
                  >
                    My Groups
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-5 pr-2">
          <MainProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
