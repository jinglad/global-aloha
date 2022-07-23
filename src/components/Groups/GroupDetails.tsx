import { Avatar } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCollection } from "../../request/getCollection";
import { getRoles } from "../../request/getRoles";
import DetailsHeader from "../Reused/DetailsHeader/DetailsHeader";
import GroupSidebar from "./GroupSidebar";

type propsType = {
  data: any;
};

const GroupDetails = ({ data }: propsType) => {
  const { globalAccessToken:token, user } = useSelector((state: any) => state.user);
  const [collection, setCollection] = useState([]);
  const [advisor, setAdvisor] = useState([]);
  const [student, setStudent] = useState([]);
  const [influencer, setInfluencer] = useState([]);
  const [observer, setObserver] = useState([]);
  const [description, setDescription] = useState<any>(null);
  // const [roles, setRoles] = useState<any>(null);
  const { id } = useRouter().query;

  // console.log({data})

  // useEffect(() => {
  //   const newRoles = getRoles(
  //     globalAccessToken,
  //     user?.ApplicationId,
  //     user?.TenantId
  //   );
  //   setRoles(newRoles);
  // }, [globalAccessToken]);

  useEffect(() => {
    const newData = getCollection(token, data?.GroupId);
    newData.then((res) => {
      const newRes = res?.flat();
      const newAdvisor = newRes?.filter((item: any) => item.RoleType === 1);
      const newStudent = newRes?.filter((item: any) => item.RoleType === 2);
      const newInfluencer = newRes?.filter((item: any) => item.RoleType === 3);
      const newObserver = newRes?.filter((item: any) => item.RoleType === 4);
      setAdvisor(newAdvisor);
      setStudent(newStudent);
      setInfluencer(newInfluencer);
      setObserver(newObserver);
    });
    const newDes = data?.Properties?.find((item:any) => item.Key === "description");
    setDescription(newDes);

    // console.log(data.Properties)
  }, [data, token]);

  return (
    <>
      <Head>
        <title>Global Aloha | {data?.Title}</title>
      </Head>
      <div className="w-3/5 mx-auto mt-5">
        <div>
          <DetailsHeader data={data} />
          <div className="relative flex">
            {token && (
              <div>
                <GroupSidebar data={data} />
              </div>
            )}
            <div className="ml-10 border-l-2 border-gray-200 pl-2 pb-2 mt-3">
              <div>
                <h4 className="text-lg font-bold">Group Description</h4>
                <p className="m-0">{description?.Value}</p>
              </div>
              <SingleOverview title="Group Advisor" items={advisor} />
              <SingleOverview title="Group Student" items={student} />
              <SingleOverview title="Group Influencer" items={influencer} />
              <SingleOverview title="Group Observer" items={observer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDetails;

type SinglePropsType = {
  title: string;
  items: any;
};

const SingleOverview = ({ title, items }: SinglePropsType) => {
  return (
    <div className="mt-4">
      <h4 className="text-lg font-bold">{title}</h4>
      <div className="m-0 flex flex-wrap gap-3">
        {items?.map((item: any) => (
          <div key={item.CollectionId} className="mr-3 text-center w-16">
            <Avatar
              size={64}
              src={item?.ProfilePhoto || "https://joeschmoe.io/api/v1/random"}
            />
            <p className="m-0 text-sm font-bold truncate w-full">{item.Name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
