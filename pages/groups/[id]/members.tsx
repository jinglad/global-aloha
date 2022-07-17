import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "../../../src/components/Login/Login";
import MemberDetails from "../../../src/components/Reused/MemberDetails/MemberDetails";

const MembersPage = ({ data }: any) => {
  const [count, setCount] = useState(0);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  const { globalAccessToken } = useSelector((state: any) => state.user);
  const router = useRouter();
  const { id } = router.query;

  // console.log(globalAccessToken)

  const getCollectionWithPagination = async (page = 0) => {
    setLoading(true);
    const response = await fetch(
      `https://api-gagroupservice-dev.saams.xyz/api/v1/group/${id}/collections/filter?pageIndex=${page}&pageSize=10`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${globalAccessToken}`,
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
  }, [id, globalAccessToken]);

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
  const response = await fetch(
    `https://api-gagroupservice-dev.saams.xyz/api/v1/group/${id}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const res = await response.json();

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: res,
    },
  };
}
