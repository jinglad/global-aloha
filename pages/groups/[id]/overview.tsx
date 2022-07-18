import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupDetails from "../../../src/components/Groups/GroupDetails";
import Login from "../../../src/components/Login/Login";
import { getGroupDetails } from "../../../src/request/getGroupDetails";

type propsType = {
  // data: any;
  id: string;
};

const OverviewPage = ({ id }: propsType) => {
  const [data, setData] = useState<any>(null);

  const { globalAccessToken } = useSelector((state: any) => state.user);

  const router = useRouter();
  // const { id } = router.query;

  // console.log(id);

  useEffect(() => {
    const token =
      typeof window !== undefined && localStorage.getItem("ga_token");
    const res = getGroupDetails(token, id);
    res.then((result) => setData(result));
  }, []);

  return (
    <>
      <GroupDetails data={data} />
    </>
  );
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
