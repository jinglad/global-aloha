import { Button, Pagination, PaginationProps, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import GroupSidebar from "../../Groups/GroupSidebar";
import DetailsHeader from "../DetailsHeader/DetailsHeader";
import InviteModal from "./InviteModal";

type PropsType = {
  collection: any;
  data: any;
  fetchData: any;
  loading: boolean;
  total: number;
};

const MemberDetails = ({
  collection,
  data,
  fetchData,
  loading,
  total,
}: PropsType) => {
  const [open, setOpen] = useState(false);

  // console.log({data});

  const onClose = () => setOpen(false);

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Member Type",
      dataIndex: "member_type",
      key: "member_type",
    },
    {
      title: "Joining Date",
      dataIndex: "joining_date",
      key: "joining_date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {data?.IsCurrentUserManager && <Button type="primary">Action</Button>}
        </Space>
      ),
    },
  ];

  // console.log(collection);

  const [tableData, setTableData] = useState<any>([]);
  const [current, setCurrent] = useState<number>(0);
  const [page, setPage] = useState(0);

  // console.log(setPage);

  const onChange: PaginationProps["onChange"] = (pageNo) => {
    setCurrent(pageNo);
    setPage(pageNo - 1);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < collection.length; i++) {
      const element = collection[i];
      let newData: any = {
        name: element.Name,
        member_type: element.RoleName,
        joining_date: new Date(element.JoinedDate).toDateString(),
      };
      newArray.push(newData);
    }
    setTableData(newArray);
  }, [collection]);

  // console.log({ data });

  return (
    <>
      <Head>
        <title>Global Aloha | {data?.title}</title>
      </Head>
      <div className="w-3/5 mx-auto mt-5">
        <div>
          <DetailsHeader data={data} />
          <div className="relative flex">
            <div>
              <GroupSidebar data={data} />
            </div>
            <div className="ml-10 border-l-2 border-gray-200 pl-2 pb-2 w-full">
              <Table
                columns={columns}
                dataSource={tableData}
                loading={loading}
                pagination={false}
              />
              <div className="my-4">
                <Pagination
                  showSizeChanger={false}
                  current={current}
                  onChange={onChange}
                  total={total}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <InviteModal open={open} onClose={onClose} />
    </>
  );
};

export default MemberDetails;
