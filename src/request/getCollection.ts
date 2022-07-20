import { globalalohaservice } from "../services/globalalohaservice";

export const getCollection = async (token:any, groupId: any) => {
    const response = await fetch(`${globalalohaservice}/${groupId}/collections`, {
        method: 'GET',
        headers: {
            "content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })

    if(response.ok) {
        const res = await response.json();
        return res;
    }
}