export const getCollection = async (token:string, groupId: any) => {
    const response = await fetch(`https://api-gagroupservice-dev.saams.xyz/api/v1/group/${groupId}/collections`, {
        method: 'GET',
        headers: {
            "content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })

    if(response.ok) {
        const res = await response.json();
        console.log(res);
        return res;
    }
}