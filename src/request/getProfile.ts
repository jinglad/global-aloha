import { setProfile } from "../Redux/userSlice";

export const getProfile = async (
  appId: string,
  userId: string,
  token: string,
  dispatch: any,
  router: any,
) => {
  const response = await fetch(
    `https://api-profileservice-dev.saams.xyz/v2/profile/parent-privileged/${appId}/${userId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    // console.log(response?.json());
    const res = await response.json();
    dispatch(setProfile(res));
    // router.push("/profile");
    await router.push(
      router.query.from
          ? decodeURIComponent(`${router.query.from}`)
          : "/profile"
  );
  }
};
