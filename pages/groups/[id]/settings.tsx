import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Settings from '../../../src/components/Reused/Settings/Settings';
import { getGroupDetails } from '../../../src/request/getGroupDetails';

const SettingsPage = ({id}:any) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("ga_token");
    const res = getGroupDetails(token, id);
    res.then((result) => setData(result));
  }, []);

  return (
    <>
    <Head>
      <title>Global Aloha | {data?.Title}</title>
    </Head>
    <Settings data={data} />
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