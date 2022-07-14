import { Avatar } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCollection } from "../../request/getCollection";
import { getRoles } from "../../request/getRoles";
import GroupSidebar from "./GroupSidebar";

type propsType = {
  data: any;
};

const GroupDetails = ({ data }: propsType) => {
  const { globalAccessToken, user } = useSelector((state: any) => state.user);
  const [collection, setCollection] = useState([]);
  const [advisor, setAdvisor] = useState([]);
  const [student, setStudent] = useState([]);
  const [influencer, setInfluencer] = useState([]);
  const [observer, setObserver] = useState([]);
  const [roles, setRoles] = useState<any>(null);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    const newRoles = getRoles(globalAccessToken,user.ApplicationId, user.TenantId);
    setRoles(newRoles)
  },[])

  useEffect(() => {
    const newData = getCollection(globalAccessToken, id);
    newData.then((res) => {
      const newRes = res.flat();
      const newAdvisor = newRes?.filter((item:any) => item.RoleType === 1);
      const newStudent = newRes?.filter((item:any) => item.RoleType === 2);
      const newInfluencer = newRes?.filter((item:any) => item.RoleType === 3);
      const newObserver = newRes?.filter((item:any) => item.RoleType === 4);
      setAdvisor(newAdvisor);
      setStudent(newStudent);
      setInfluencer(newInfluencer);
      setObserver(newObserver);
    })
  }, []);

  return (
    <>
      <Head>
        <title>Global Aloha | {data.Title}</title>
      </Head>
      <div className="w-3/5 mx-auto mt-5">
        <div>
          <div className="h-60 w-full rounded relative overflow-hidden">
            <img
              src={
                data.Properties?.[0]?.Value
                  ? data.Properties?.[0]?.Value
                  : "/images/default-cover.png"
              }
              alt={data.Properties?.[0]?.Key}
              className="w-full rounded object-cover h-full"
            />
          </div>
          <div className="mt-3 flex items-center">
            <div className="w-20 h-20 mr-3">
              <img
                src={data.Properties?.[1]?.Value}
                alt={data.Properties?.[1]?.Key}
                className="w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg m-0">{data.Title}</h3>
              <p className="m-0">{data.Properties?.[3]?.Value}</p>
            </div>
          </div>
          <div className="relative flex">
            <div>
              <GroupSidebar />
            </div>
            <div className="ml-10 border-l-2 border-gray-200 pl-2 pb-2">
              <div>
              <h4 className="text-lg font-bold">Group Description</h4>
              <p className="m-0">{data?.Properties?.[7]?.Value}</p>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold">Group Advisor</h4>
                <div className="m-0 flex flex-wrap gap-3">
                  {
                    advisor?.map((item:any) => <div key={item.CollectionId} className="mr-3 text-center w-16">
                      <Avatar size={64} src={item.ProfilePhoto || "https://joeschmoe.io/api/v1/random"} />
                      <p className="m-0 text-sm font-bold truncate w-full">{item.Name}</p>
                    </div>)
                  }
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold">Group Student</h4>
                <div className="m-0 flex flex-wrap gap-3">
                  {
                    student?.map((item:any) => <div key={item.CollectionId} className="mr-3 text-center w-16">
                      <Avatar size={64} src={item?.ProfilePhoto || "https://joeschmoe.io/api/v1/random"} />
                      <p className="m-0 text-sm font-bold truncate w-full">{item.Name}</p>
                    </div>)
                  }
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold">Group Influencer</h4>
                <div className="m-0 flex flex-wrap gap-3">
                  {
                    influencer?.map((item:any) => <div key={item.CollectionId} className="mr-3 text-center w-16">
                      <Avatar size={64} src={item?.ProfilePhoto || "https://joeschmoe.io/api/v1/random"} />
                      <p className="m-0 text-sm font-bold truncate w-full">{item.Name}</p>
                    </div>)
                  }
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold">Group Observer</h4>
                <div className="m-0 flex flex-wrap gap-3">
                  {
                    observer?.map((item:any) => <div key={item.CollectionId} className="mr-3 text-center w-16">
                      <Avatar size={64} src={item?.ProfilePhoto || "https://joeschmoe.io/api/v1/random"} />
                      <p className="m-0 text-sm font-bold truncate w-full">{item.Name}</p>
                    </div>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDetails;
