import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../../src/components/Login/Login';
import MyActivity from '../../src/components/MyActivity/MyActivity';
import useToken from '../../src/hooks/useToken';

const MyActivityPage = () => {
  const token = useToken();
  return (
    <>
        {
            token ? <MyActivity /> : <Login />
        }
    </>
  )
}

export default MyActivityPage