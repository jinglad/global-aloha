import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "../../../src/components/Login/Login";
import MemberDetails from "../../../src/components/Reused/MemberDetails/MemberDetails";
import useToken from "../../../src/hooks/useToken";
import { getGroupDetails } from "../../../src/request/getGroupDetails";
import { gagroupservice } from "../../../src/services/gagroupservice";
import { redirectUnAuthenticatedSSR } from "../../../src/utils/utils";

const MembersPage = () => {
  const [count, setCount] = useState(0);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const {globalAccessToken:token} = useSelector((state:any) => state.user); 
  const router = useRouter();
  const {id} = router.query;

  const getCollectionWithPagination = async (page = 0) => {
    setLoading(true);
    const response = await fetch(
      `${gagroupservice}/api/v1/group/${id}/collections/filter?pageIndex=${page}&pageSize=10`,
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
      setCollection(res.Items);
      setCount(res.Count);
    }
  };

  useEffect(() => {
    getCollectionWithPagination();
  }, [token]);

  useEffect(() => {
    const res = getGroupDetails(token, id);
    res.then((result) => setData(result));
  }, [token]);

  return (
    <MemberDetails
      data={data}
      collection={collection}
      fetchData={getCollectionWithPagination}
      loading={loading}
      total={count}
    />
  );
};

export default MembersPage;

MembersPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);
