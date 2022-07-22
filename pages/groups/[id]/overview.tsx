import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupDetails from "../../../src/components/Groups/GroupDetails";
import { getGroupDetails } from "../../../src/request/getGroupDetails";

type propsType = {
  id: string;
};

const OverviewPage = ({ id }: propsType) => {
  const [data, setData] = useState<any>(null);
  const { globalAccessToken: token } = useSelector((state: any) => state.user);

  useEffect(() => {
    const res = getGroupDetails(token, id);
    res.then((result) => {
      setData(result);
    });
  }, [token]);

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
