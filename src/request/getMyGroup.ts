import { setMyGroup, setMyLibrary } from "../Redux/librarySlice";

export const getMyGroup = async (
  dispatch: any,
  pageIndex = 0,
  pageSize = 12,
  token: string,
  userId: string
) => {
  const response = await fetch(
    `https://api-gagroupservice-dev.saams.xyz/api/v1/group?pageSize=${pageSize}&pageNum=${pageIndex}&userId=${userId}`,
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
    dispatch(setMyGroup(res.Groups));
  }
};
