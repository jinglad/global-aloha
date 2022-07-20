export const getSearchResult = async (
  key: any,
  index = 0,
  size = 12,
  setLoader: any
) => {
  setLoader(true);
  const response = await fetch(
    `https://api-globalalohaservice-dev.saams.xyz/v1/common/global-search?pageIndex=${index}&pageSize=${size}&searchTerm=${key}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  setLoader(false);
  if (response.ok) {
    const res = await response.json();
    return res;
  }
};
