import { NextPage } from "next";
import React from "react";
import Profile from "../../src/components/Profile/Profile";
import { redirectUnAuthenticatedSSR } from "../../src/utils/utils";

const ProfilePage: NextPage = () => {
  return <Profile />;
};

export default ProfilePage;

ProfilePage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);
