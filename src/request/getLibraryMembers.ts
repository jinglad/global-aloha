import { globalalohaservice } from "../services/globalalohaservice";
import { token } from "../utils/utils";

export const getLibraryMembers = async (
  id: any,
  page = 0,
  size = 12,
) => {
  const response = await fetch(
    `${globalalohaservice}/${id}/members?memberStatuses=2&memberStatuses=5&memberStatuses=0&pageIndex=${page}&pageSize=${size}`,
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
};
