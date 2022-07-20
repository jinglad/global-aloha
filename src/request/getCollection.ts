export const getCollection = async (token:any, groupId: any) => {
    const response = await fetch(`https://api-gagroupservice-dev.saams.xyz/api/v1/group/${groupId}/collections`, {
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