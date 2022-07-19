import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "../../../src/components/Login/Login";
import MemberDetails from "../../../src/components/Reused/MemberDetails/MemberDetails";
import { getGroupDetails } from "../../../src/request/getGroupDetails";
import { token } from "../../../src/utils/utils";

const MembersPage = ({id }: any) => {
  const [count, setCount] = useState(0);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const { globalAccessToken } = useSelector((state: any) => state.user);
  const router = useRouter();
  // const { id } = router.query;

  // console.log(globalAccessToken)

  const getCollectionWithPagination = async (page = 0) => {
    setLoading(true);
    const response = await fetch(
      `https://api-gagroupservice-dev.saams.xyz/api/v1/group/${id}/collections/filter?pageIndex=${page}&pageSize=10`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );
    setLoading(false);
    if (response.ok) {
      const res = await response.json();
      // console.log("collection with pagination ", res);
      setCollection(res.Items);
      setCount(res.Count);
    }
  };

  useEffect(() => {
    getCollectionWithPagination();
  }, []);

  useEffect(() => {
    const res = getGroupDetails(token, id);
    res.then((result) => setData(result));
  }, []);

  return (
    <>
      {globalAccessToken ? (
        <MemberDetails
          data={data}
          collection={collection}
          fetchData={getCollectionWithPagination}
          loading={loading}
          total={count}
        />
      ) : (
        <Login />
      )}
    </>
  );
};

export default MembersPage;

export async function getServerSideProps({ params }: any) {
  const { id } = params;

  return {
    props: {
      id,
    },
  };
}
