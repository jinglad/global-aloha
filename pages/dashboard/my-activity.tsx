import React from "react";
import MyActivity from "../../src/components/MyActivity/MyActivity";
import { redirectUnAuthenticatedSSR } from "../../src/utils/utils";

const MyActivityPage = () => {
  return <MyActivity />;
};

export default MyActivityPage;

MyActivityPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);
