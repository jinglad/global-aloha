import { globalalohaservice } from "../services/globalalohaservice";
import { token } from "../utils/utils"

export const getLibraryDetails = async (id:any) => {
  const response = await fetch(`${globalalohaservice}/${id}/settings`, {
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