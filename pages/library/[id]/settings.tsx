import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import LibrarySettings from '../../../src/components/Library/LibrarySettings';
import useToken from '../../../src/hooks/useToken';
import { getLibraryDetails } from '../../../src/request/getLibraryDetails';


const SettingsPage = ({id}:any) => {
  const [data, setData] = useState<any>(null);
  const [update, setUpdate] = useState(1);
  const token =  useToken();

  useEffect(() => {
    const res = getLibraryDetails(id, token);
    res.then((result) => {
      setData(result);
      if(!result.HasManagerPrivileges && token) Router.push(`/library/${id}/overview`);
    });
  }, [update, token]);

  return (
    <>
    <Head>
      <title>Global Aloha | {data?.Name}</title>
    </Head>
    <LibrarySettings data={data} setUpdate={setUpdate} />
    </>
  )
}

export default SettingsPage;

export async function getServerSideProps({ params }: any) {
  const { id } = params;

  return {
    props: {
      id,
    },
  };
}