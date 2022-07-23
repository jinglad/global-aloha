import { globalalohaservice } from "../services/globalalohaservice";

export const getActivityRole = async (activityId: any, token:string | undefined) => {
  const response = await fetch(
    `${globalalohaservice}/v1/activity/${activityId}/user/role`,
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
