import { setMyLibrary } from "../Redux/librarySlice";

export const getMyActivity = async (
  dispatch: any,
  pageIndex = 0,
  pageSize = 12,
  token: string,
  userId: string
) => {
  const response = await fetch(
    `https://api-globalalohaservice-dev.saams.xyz/v1/activity/user/${userId}/activity?pageIndex=${pageIndex}&pageSize=${pageSize}&filterActivityType=-1&roleType=&progressStatus=&status=&classYearId=`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if(response.ok) {
    const res = await response.json();
    dispatch(setMyLibrary(res.Items));
  }
};
