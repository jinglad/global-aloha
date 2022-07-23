import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import LibraryDetails from '../../../src/components/Library/LibraryDetails';
import { getLibraryDetails } from '../../../src/request/getLibraryDetails';

type PropsType = {
  id: string | undefined;
}

const LibraryOverviewPage = ({id}:PropsType) => {
  const [data, setData] = useState<any>(null);
  const {globalAccessToken:token} = useSelector((state:any) => state.user);

  useEffect(() => {
    const result = getLibraryDetails(id, token);
    result.then((res) => setData(res))
  },[token, id])

  return (
    <LibraryDetails data={data} />
  )
}

export default LibraryOverviewPage


export async function getServerSideProps({ params }: any) {
  const { id } = params;

  return {
    props: {
      id,
    },
  };
}


