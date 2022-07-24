export const getNotification = async (
  token: string | undefined,
  userId: string | undefined,
  pagingToken?: number
) => {
  if(pagingToken) {
    const response = await fetch(
      `https://api-requestservice-dev.saams.xyz/v2/requests/notifications/user/${userId}?pageSize=12&&pagingToken=${pagingToken}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const res = await response.json();
      return res;
    }
  } else {
    const response = await fetch(
      `https://api-requestservice-dev.saams.xyz/v2/requests/notifications/user/${userId}?pageSize=12`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const res = await response.json();
      return res;
    }
  }
};
