import Head from 'next/head'
import React from 'react'
import { token } from '../../utils/utils'
import DetailsHeader from '../Reused/DetailsHeader/DetailsHeader'
import LibrarySidebar from './LibrarySidebar'

const LibraryDetails = ({data}:any) => {
  return (
    <>
      <Head>
        <title>Global Aloha | {data?.Name}</title>
      </Head>
      <div className="w-3/5 mx-auto mt-5">
        <div>
          <DetailsHeader data={data} type="library" />
          <div className="relative flex">
            {token && (
              <div>
                <LibrarySidebar data={data} />
              </div>
            )}
            <div className="ml-10 border-l-2 border-gray-200 pl-2 pb-2 mt-3">
              <h1>Working</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LibraryDetails