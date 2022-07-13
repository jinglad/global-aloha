import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../../src/components/Login/Login';
import MyActivity from '../../src/components/MyActivity/MyActivity';

const MyActivityPage = () => {
    const {globalAccessToken} = useSelector((state:any) => state.user);
  return (
    <>
        {
            globalAccessToken ? <MyActivity /> : <Login />
        }
    </>
  )
}

export default MyActivityPage