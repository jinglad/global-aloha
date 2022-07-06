const appId = "e1e0322c-acb0-4a24-958c-23b2ad912a2c";
const tenantId = "af3baf1d-7aae-462c-9d1e-051cef459b86";
const roleId = "67d38259-1de5-4434-aaf7-d69fe827109f";

export const getUserInfo = async (dispatch:any, token: string) => {
  console.log(token);
  const response = await fetch(`https://api-userservice-dev.saams.xyz/api/v2/user/${appId}/${tenantId}/${roleId}`, {
    method: "GET",
    headers: {
      "content-type":"application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  if(response.ok) {
    const res = await response.json();
    console.log(res);
  }
}