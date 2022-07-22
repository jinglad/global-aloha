import { globalalohaservice } from "../services/globalalohaservice";

export const getLibraryDetails = async (id:any, token:string | undefined) => {
  const response = await fetch(`${globalalohaservice}/v1/activity/${id}/settings`, {
    method: "GET",
    headers: {
      "content-type":"application/json",
      "authorization": `Bearer ${token}`
    }
  })

  if(response.ok) {
    const res = await response.json();
    console.log(res);
    return res;
  }
}