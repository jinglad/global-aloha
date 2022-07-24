export const getRequest = async (token: string | undefined, page = 0, size = 5, userId: string | undefined) => {
    const response = await fetch(`https://api-requestservice-dev.saams.xyz/v2/requests?pageIndex=${page}&pageSize=${size}&userId=${userId}`, {
      method: "GET",
      headers: {
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
    })
    if(response.ok) {
      return await response.json();
    }
}