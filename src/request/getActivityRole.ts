import { globalalohaservice } from "../services/globalalohaservice";
import { token } from "../utils/utils";

export const getActivityRole = async (activityId: any) => {
  const response = await fetch(
    `${globalalohaservice}/${activityId}/user/role`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify([0]),
    }
  );

  if (response.ok) {
    const res = await response.json();
    return res;
  }
};
