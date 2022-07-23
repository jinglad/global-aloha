import React from "react";
import MyGroup from "../../src/components/MyGroup/MyGroup";
import { redirectUnAuthenticatedSSR } from "../../src/utils/utils";

const MyGroupPage = () => {
  return <MyGroup />;
};

export default MyGroupPage;

MyGroupPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);
