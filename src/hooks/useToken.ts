import React, { useEffect, useState } from 'react'

const useToken = () => {
  const [token, setToken] = useState<any>(null);
  
  useEffect(() => {
    const newToken = localStorage.getItem("ga_token");
    setToken(newToken);
  },[])

  return token;
}

export default useToken;