import React, { useEffect, useState } from "react";
import LibraryMember from "../../../src/components/Library/LibraryMember";
import Login from "../../../src/components/Login/Login";
import useToken from "../../../src/hooks/useToken";
import { getLibraryDetails } from "../../../src/request/getLibraryDetails";
import { globalalohaservice } from "../../../src/services/globalalohaservice";

const members = ({ id }: any) => {
  const [members, setMembers] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const token = useToken();

  const getLibraryMembers = async (page = 0) => {
    setLoading(true);
    const response = await fetch(
      `${globalalohaservice}/${id}/members?memberStatuses=2&memberStatuses=5&memberStatuses=0&pageIndex=${page}&pageSize=10&searchTerm=`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    setLoading(false);

    if (response.ok) {
      const res = await response.json();
      setMembers(res?.Items);
      setCount(res?.Count);
    }
  };

  useEffect(() => {
    getLibraryMembers();
  }, [id]);

  useEffect(() => {
    const result = getLibraryDetails(id);
    result.then((res) => setData(res));
  }, [id]);

  return (
    <>
      {token ? (
        <LibraryMember
          data={data}
          collection={members}
          fetchData={getLibraryMembers}
          loading={loading}
          total={count}
        />
      ) : (
        <Login />
      )}
    </>
  );
};

export default members;

export async function getServerSideProps({ params }: any) {
  const { id } = params;

  return {
    props: {
      id,
    },
  };
}
