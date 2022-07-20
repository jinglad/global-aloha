import React from "react";
import { useSelector } from "react-redux";
import Login from "../../src/components/Login/Login";
import MyGroup from "../../src/components/MyGroup/MyGroup";
import useToken from "../../src/hooks/useToken";

const MyGroupPage = () => {
  const token = useToken();
  return <>{token ? <MyGroup /> : <Login />}</>;
};

export default MyGroupPage;
