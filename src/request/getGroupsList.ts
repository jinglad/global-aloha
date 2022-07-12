import { setGroupCount, setGroups } from "../Redux/librarySlice";

const applicationId = "e1e0322c-acb0-4a24-958c-23b2ad912a2c";
const tenantId = "af3baf1d-7aae-462c-9d1e-051cef459b86";

export const getGroupsList = async (
  dispatch: any,
  pageSize = 0,
  pageIndex = 0,
  setLoading: any
) => {
  setLoading(true);
  const response = await fetch(
    `https://gagroupservice.saasms.com/api/v1/group/library?pageIndex=${pageIndex}&pageSize=${pageSize}&applicationId=${applicationId}&tenantId=${tenantId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  setLoading(false);

  if (response.ok) {
    const res = await response.json();
    dispatch(setGroups(res.Groups));
    dispatch(setGroupCount(res.TotalCount));
  }
};
