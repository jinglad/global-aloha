import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Settings from '../../../src/components/Reused/Settings/Settings';
import { getGroupDetails } from '../../../src/request/getGroupDetails';
import { redirectUnAuthenticatedSSR } from '../../../src/utils/utils';


const SettingsPage = () => {
  const [data, setData] = useState<any>(null);
  const [update, setUpdate] = useState(1);
  const {globalAccessToken:token} = useSelector((state:any) => state.user);
  const router = useRouter();
  const {id} = router.query;

  

  useEffect(() => {
    const res = getGroupDetails(token, id);
    res.then((result) => {
      setData(result);
      if(!result.IsCurrentUserManager && token) router.push(`/groups/${id}/overview`);
    });
  }, [update, token, id]);

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

SettingsPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);