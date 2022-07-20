import { Button, Radio, RadioChangeEvent } from "antd";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyActivity } from "../../request/getMyActivity";
import Card from "../Reused/Card/Card";
import FilterModal from "../Reused/FilterModal/FilterModal";

const MyActivity = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(null);

  const onClose = () => {
    setOpen(false);
  };

  const { globalAccessToken, user } = useSelector((state: any) => state.user);
  const { myLibrary } = useSelector((state: any) => state.library);

  const [library, setLibrary] = useState(myLibrary);

  useEffect(() => {
    getMyActivity(dispatch, page, size, globalAccessToken, user.UserId);
  }, []);

  const handleChange = (e: RadioChangeEvent) => {
    // console.log("radio checked", e.target.value);
    setFilterValue(e.target.value);
  };

  const handleFilter = async () => {
    const response = await fetch(
      `https://api-globalalohaservice-dev.saams.xyz/v1/activity/user/${user.UserId}/activity?pageIndex=${page}&pageSize=${size}&filterActivityType=${filterValue}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${globalAccessToken}`,
        },
      }
    );

    if (response.ok) {
      const res = await response.json();
      // console.log(res);
      setLibrary(res.Items);
    }
  };

  const activityType = [
    "Project",
    "Company",
    "Internship",
    "Challenge",
    "Service",
    "Event",
  ];

  return (
    <>
      <Head>
        <title>Global Aloha | My Activity</title>
      </Head>
      <div className="container mx-auto mt-5">
        <div className="bg-gray-200 h-48 w-full rounded relative">
          <div className="absolute top-12 left-12">
            <h2 className="font-bold text-xl">My Activity</h2>
            <p>Includes Projects, Companies, Internships {"&"} Contests</p>
          </div>
        </div>
        <div className="mt-3 text-right">
          <Button onClick={() => setOpen(true)} type="primary" size="large">
            Filter
          </Button>
        </div>
        <div className="mt-5 grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {library?.map((item: any) => (
            <Card key={item.Id} item={item} type="library" myLibrary={true} />
          ))}
          {library?.length === 0 && (
            <h3 className="col-span-full font-bold text-center text-xl">
              No data available!
            </h3>
          )}
        </div>
      </div>
      <FilterModal
        open={open}
        onClose={onClose}
        type="activity"
        handleFilter={handleFilter}
      >
        <h4 className="font-bold text-md">Activity</h4>
        <Radio.Group onChange={handleChange} value={filterValue}>
          {activityType.map((item, i) => (
            <Radio key={i} value={i}>{item}</Radio>
          ))}
        </Radio.Group>
      </FilterModal>
    </>
  );
};

export default MyActivity;
