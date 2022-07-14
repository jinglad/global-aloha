import React from 'react'
import { useSelector } from 'react-redux'
import GroupDetails from '../../../src/components/Groups/GroupDetails';
import Login from '../../../src/components/Login/Login';

type propsType = {
    data: any,
  }

const OverviewPage = ({data}:propsType) => {
  const {globalAccessToken} = useSelector((state:any) => state.user);
  return (
    <>
        {
            globalAccessToken ? <GroupDetails data={data} /> : <Login />
        }
    </>
  )
}

export default OverviewPage;

export async function getServerSideProps({params}:any) {
    const {id} = params;
    const response = await fetch(`https://api-gagroupservice-dev.saams.xyz/api/v1/group/${id}`, {
      method: "GET", 
      headers: {
        "content-type":"application/json",
      }
    })
  
    const res = await response.json();
  
    if (!res) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        data: res
      }, 
    }
  }