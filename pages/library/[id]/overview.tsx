import React, { useEffect, useState } from 'react'
import LibraryDetails from '../../../src/components/Library/LibraryDetails';
import useToken from '../../../src/hooks/useToken';
import { getLibraryDetails } from '../../../src/request/getLibraryDetails';

type PropsType = {
  id: string | undefined;
}

const LibraryOverviewPage = ({id}:PropsType) => {
  const [data, setData] = useState<any>(null);
  const token = useToken();

  useEffect(() => {
    const result = getLibraryDetails(id, token);
    result.then((res) => setData(res))
  },[])

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


