import React, { useEffect, useState } from "react";
import LibraryMember from "../../../src/components/Library/LibraryMember";
import { redirectUnAuthenticatedSSR } from "../../../src/utils/utils";

const MembersPage = () => {
  return <LibraryMember />;
};

export default MembersPage;

MembersPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);
