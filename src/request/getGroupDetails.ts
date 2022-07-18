export const getGroupDetails = async (token:any, id:any) => {
  const response = await fetch(`https://api-gagroupservice-dev.saams.xyz/api/v1/group/${id}`, {
    method: "GET", 
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })

  if(response.ok) {
    const res = await response.json();
    return res;
  }
}