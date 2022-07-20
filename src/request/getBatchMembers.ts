import { globalalohaservice } from "../services/globalalohaservice";

export const getBatchMembers = async (id:any, token:string) => {
  const response = await fetch(`${globalalohaservice}/v1/activity/${id}/members/batchmembers`, {
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