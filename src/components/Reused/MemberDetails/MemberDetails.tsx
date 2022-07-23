import { Button, Pagination, PaginationProps, Space } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { gagroupservice } from "../../../services/gagroupservice";
import GroupSidebar from "../../Groups/GroupSidebar";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsHeader from "../DetailsHeader/DetailsHeader";
import ActionModal from "./ActionModal";
import InviteModal from "./InviteModal";

type PropsType = {
  collection: any;
  data: any;
  fetchData: any;
  loading: boolean;
  total: number;
  type?: string;
};

const MemberDetails = ({
  collection,
  data,
  fetchData,
  loading,
  total,
  type,
}: PropsType) => {
  const [open, setOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [tableData, setTableData] = useState<any>([]);
  const [current, setCurrent] = useState<number>(0);
  const [page, setPage] = useState(0);

  // console.log({data});

  const onClose = () => setOpen(false);
  const onActionClose = () => setActionOpen(false);
  const onDeleteClose = () => setDeleteModal(false);

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
          {data?.IsCurrentUserManager && (
            <>
              <Button
                type="primary"
                onClick={() => {
                  setActionOpen(true);
                  const obj = collection?.find(
                    (item: any) => item.CollectionId === record.id
                  );
                  setSelected(obj);
                  // console.log(obj)
                }}
              >
                Action
              </Button>
              <Button
                onClick={() => {
                  setSelected(record);
                  setDeleteModal(true);
                }}
                type="ghost"
              >
                Remove
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  // console.log(collection);

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
        id: element.CollectionId,
        name: element.Name,
        member_type: element.RoleName,
        joining_date: new Date(element.JoinedDate).toDateString(),
      };
      newArray.push(newData);
    }
    setTableData(newArray);
    // console.log(collection)
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
          {data?.IsCurrentUserManager && (
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
      <InviteModal open={open} onClose={onClose} fetchData={fetchData} />
      <ActionModal
        open={actionOpen}
        onClose={onActionClose}
        selected={selected}
      />
      <DeleteModal
        open={deleteModal}
        onClose={onDeleteClose}
        fetchData={fetchData}
        selected={selected}
        collection={collection}
        page={page}
      />
    </>
  );
};

export default MemberDetails;
