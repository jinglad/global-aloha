import { NextPage } from 'next';
import React from 'react'
import { useSelector } from 'react-redux';
import Login from '../../src/components/Login/Login';
import Profile from '../../src/components/Profile/Profile';

const ProfilePage: NextPage = () => {
  const {globalAccessToken} = useSelector((state:any) => state.user);
  return (
    <>
      {
        globalAccessToken ? <Profile /> : <Login />
      }
    </>
  )
}

export default ProfilePage;