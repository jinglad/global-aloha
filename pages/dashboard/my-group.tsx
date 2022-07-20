import React from "react";
import { useSelector } from "react-redux";
import Login from "../../src/components/Login/Login";
import MyGroup from "../../src/components/MyGroup/MyGroup";

const MyGroupPage = () => {
  const { globalAccessToken } = useSelector((state: any) => state.user);
  return <>{globalAccessToken ? <MyGroup /> : <Login />}</>;
};

export default MyGroupPage;
