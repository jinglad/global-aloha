import { gagroupservice } from "../services/gagroupservice";

export const getRoles = async (token:string, applicationId:string, tenantId: string) => {
  const response = await fetch(`${gagroupservice}/api/v1/group/roles?applicationId=${applicationId}&tenantId=${tenantId}`, {
    method: "GET",
    headers: {
      "content-type":"application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  if(response.ok) {
    const res = await response.json();
    return res;
  }
}