import React from 'react'
import LibraryDetails from '../../src/components/Library/LibraryDetails';

const ActivityDetailsPage = () => {
  return (
    <LibraryDetails />
  )
}

export default ActivityDetailsPage;

export const getServerSideProps = async () => {
    const request = await fetch("", {
        method: "GET",
        "headers": {
            "content-type": "application/json"
        }
    })

    if(request.ok) {
        const res = await request.json();
        console.log(res);
    }
}