import { globalalohaservice } from "../services/globalalohaservice";
import { token } from "../utils/utils"

export const getBatchMembers = async (id:any) => {
  const response = await fetch(`${globalalohaservice}/${id}/members/batchmembers`, {
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