import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const useToken = () => {
  const [token, setToken] = useState<any>(null);
  const [cookie, setCookie] = useCookies(["ga_token"]);
  
  // useEffect(() => {
  //   const newToken = localStorage.getItem("ga_token");
  //   setToken(newToken);
  // },[])

  return token;
}

export default useToken;