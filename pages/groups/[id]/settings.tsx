import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import Settings from '../../../src/components/Reused/Settings/Settings';
import useToken from '../../../src/hooks/useToken';
import { getGroupDetails } from '../../../src/request/getGroupDetails';


const SettingsPage = ({id}:any) => {
  const [data, setData] = useState<any>(null);
  const [update, setUpdate] = useState(1);
  const token =  useToken();

  useEffect(() => {
    const res = getGroupDetails(token, id);
    res.then((result) => setData(result));
  }, [update]);

  return (
    <>
    <Head>
      <title>Global Aloha | {data?.Title}</title>
    </Head>
    <Settings data={data} setUpdate={setUpdate} />
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