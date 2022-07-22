import React from "react";
import { useSelector } from "react-redux";
import Login from "../../src/components/Login/Login";
import MyGroup from "../../src/components/MyGroup/MyGroup";
import useToken from "../../src/hooks/useToken";
import { redirectUnAuthenticatedSSR } from "../../src/utils/utils";

const MyGroupPage = () => {
  return <MyGroup />;
};

export default MyGroupPage;

MyGroupPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);
