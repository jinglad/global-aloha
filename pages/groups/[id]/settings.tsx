import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Settings from '../../../src/components/Reused/Settings/Settings';
import { getGroupDetails } from '../../../src/request/getGroupDetails';
import { token } from '../../../src/utils/utils';

const SettingsPage = ({id}:any) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [update, setUpdate] = useState(1);

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