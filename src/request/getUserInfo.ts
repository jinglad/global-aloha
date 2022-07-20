import { setUser } from "../Redux/userSlice";
import { getProfile } from "./getProfile";

const appId = "e1e0322c-acb0-4a24-958c-23b2ad912a2c";
const tenantId = "af3baf1d-7aae-462c-9d1e-051cef459b86";
const roleId = "67d38259-1de5-4434-aaf7-d69fe827109f";

export const getUserInfo = async (dispatch: any, token: string, router:any) => {
  const details = {
    Token: token,
  };

  let formBody: any = [];

  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    // @ts-ignore
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  const response = await fetch(
    `https://api-userservice-dev.saams.xyz/v2/verify?clientside=true`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: formBody,
    }
  );

  if (response.ok) {
    const res = await response.json();
    dispatch(setUser(res));
    getProfile(res?.ApplicationId, res?.UserId, token, dispatch, router);
  }
};
