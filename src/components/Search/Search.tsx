import { Button, Pagination, PaginationProps } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSearchResult } from "../../request/getSearchResult";
import Card from "../Reused/Card/Card";
import Loader from "../Reused/Loader/Loader";

const Search = () => {
  const router = useRouter();
  const { key } = router.query;
  const [term, setTerm] = useState("");
  const [searchResult, setSearchResult] = useState<any>({});
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [loader, setLoader] = useState(false);
  const [totalResult, setTotalResult] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const result = getSearchResult(key, page, size, setLoader);
    result.then((res) => {
      setSearchResult(res);
      setTotalResult(res.Item2);
    });
  }, [key, page]);

  const onChange: PaginationProps['onChange'] = pageNo => {
    setCurrent(pageNo);
    setPage(pageNo-1);
  };

  return (
    <>
      <Head>
        <title>Global Aloha | Search</title>
      </Head>
      <div className="container mx-auto pb-5">
        <div className="h-60 bg-gray-200 w-full my-5 rounded">
          <div className="w-3/4 mx-auto">
            <input
              type="text"
              className="py-3 px-2 bg-white mt-20 rounded w-full outline-none"
              placeholder="Search here!"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTerm(e.target.value)
              }
            />
            <div className="text-center mt-3">
              <Button
                type="primary"
                size="large"
                onClick={() => router.push(`search?key=${term}`)}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-5 grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {loader ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Loader />
            </div>
          ) : (
            <>
              {searchResult?.Item1?.map((item: any) => (
                <Card key={item.ModuleId} item={item} type="search" />
              ))}
              {searchResult?.Item1?.length === 0 && (
                <p className="text-center mt-20 col-span-full font-bold text-2xl">
                  No matching result
                </p>
              )}
            </>
          )}
        </div>
        {
         !loader && searchResult?.Item1?.length > 0 && <div className="mt-3 mb-5">
         <Pagination showSizeChanger={false} current={current} onChange={onChange} total={totalResult} />
         </div> 
        }
      </div>
    </>
  );
};

export default Search;
