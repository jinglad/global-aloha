import { setCount, setLibraryList } from "../Redux/librarySlice";
import { globalalohaservice } from "../services/globalalohaservice";

export const getLibraryList = async (goal = "", pageSize = 12, pageIndex = 0, dispatch:any, setLoading: any) => {
  const response = await fetch(`${globalalohaservice}/v1/activity/library?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    method: 'POST',
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify({goal})
  })
  setLoading(false);
  if(response.ok) {
    const res = await response.json();
    dispatch(setLibraryList(res.Items));
    dispatch(setCount(res.Count));
  }
}