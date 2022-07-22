import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import LibrarySettings from '../../../src/components/Library/LibrarySettings';
import { getLibraryDetails } from '../../../src/request/getLibraryDetails';
import { redirectUnAuthenticatedSSR } from '../../../src/utils/utils';


const SettingsPage = () => {
  const [data, setData] = useState<any>(null);
  const [update, setUpdate] = useState(1);
  const {globalAccessToken:token} = useSelector((state:any) => state.user);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    const res = getLibraryDetails(id, token);
    res.then((result) => {
      setData(result);
      if(!result?.HasManagerPrivileges && token) router.push(`/library/${id}/overview`).then();
    });
  }, [update, token, id]);

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


SettingsPage.getInitialProps = async (context: any) =>
  redirectUnAuthenticatedSSR(context);