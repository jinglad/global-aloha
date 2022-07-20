import { Button, Pagination, PaginationProps, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import GroupSidebar from "../Groups/GroupSidebar";
import ActionModal from "../Reused/MemberDetails/ActionModal";
import InviteModal from "../Reused/MemberDetails/InviteModal";
import LibraryDetailsHeader from "./LibraryDetailsHeader";

type PropsType = {
  collection: any;
  data: any;
  fetchData: any;
  loading: boolean;
  total: number;
  type?: string;
};

const LibraryMember = ({
  collection,
  data,
  fetchData,
  loading,
  total,
}: PropsType) => {
  const [open, setOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onActionClose = () => setActionOpen(false);

  // console.log({data});

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {data?.HasManagerPrivileges && (
            <Button
              type="primary"
              onClick={() => {
                setActionOpen(true);
              }}
            >
              Action
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // console.log(collection);

  const [tableData, setTableData] = useState<any>([]);
  const [current, setCurrent] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

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
    for (let i = 0; i < collection?.length; i++) {
      const element = collection[i];
      let newData: any = {
        id: element.UserId,
        name: element.Name,
        member_type: "",
      };
      newArray.push(newData);
    }
    setTableData(newArray);
  }, [collection]);

  return (
    <>
      <Head>
        <title>Global Aloha | {data?.Name}</title>
      </Head>
      <div className="w-3/5 mx-auto mt-5">
        <div>
          <div>
            <LibraryDetailsHeader data={data} />
          </div>
          {data?.HasManagerPrivileges && (
            <div className="my-3 text-right">
              <button
                onClick={() => setOpen(true)}
                className="py-2 px-3 bg-lime-300 hover:bg-lime-400 rounded text-white"
              >
                Invite
              </button>
            </div>
          )}
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
      {/* <InviteModal open={open} onClose={onClose} fetchData={fetchData} /> */}
      {/* <ActionModal open={actionOpen} onClose={onActionClose} /> */}
    </>
  );
};

export default LibraryMember;
