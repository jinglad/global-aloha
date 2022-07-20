import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GroupDetails from "../../../src/components/Groups/GroupDetails";
import { getGroupDetails } from "../../../src/request/getGroupDetails";
import { isBrowser } from "../../../src/utils/utils";

type propsType = {
  // data: any;
  id: string;
};

const OverviewPage = ({ id }: propsType) => {
  const [data, setData] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const token = isBrowser && localStorage.getItem("ga_token");
    const res = getGroupDetails(token, id);
    res.then((result) => setData(result));
  }, []);

  return <GroupDetails data={data} />;
};

export default OverviewPage;

export async function getServerSideProps({ params }: any) {
  const { id } = params;

  return {
    props: {
      id,
    },
  };
}
