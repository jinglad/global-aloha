import { gagroupservice } from "../services/gagroupservice";

export const getGroupDetails = async (token:any, id:any) => {
  const response = await fetch(`${gagroupservice}/api/v1/group/${id}`, {
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