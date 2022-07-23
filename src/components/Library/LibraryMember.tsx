import { Button, Pagination, PaginationProps, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { globalalohaservice } from "../../services/globalalohaservice";
import LibraryDetailsHeader from "./LibraryDetailsHeader";
import LibrarySidebar from "./LibrarySidebar";
import { getLibraryDetails } from "../../../src/request/getLibraryDetails";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ActivityInvite from "./ActivityInvite";
import DeleteModal from "../Reused/DeleteModal/DeleteModal";

type PropsType = {};

const LibraryMember = ({}: PropsType) => {
  const [members, setMembers] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [selected, setSelected] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const { globalAccessToken: token } = useSelector((state: any) => state.user);
  const { id } = useRouter().query; 

  const getLibraryMembers = async (page = 0) => {
    setLoading(true);
    const response = await fetch(
      `${globalalohaservice}/v1/activity/${id}/members?memberStatuses=2&memberStatuses=5&memberStatuses=0&pageIndex=${page}&pageSize=10&searchTerm=`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    if (response.ok) {
      const res = await response.json();
      setMembers(res?.Items);
      setCount(res?.Count);
    }
  };

  const [open, setOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {data?.HasManagerPrivileges && (
            <>
              <Button
              type="primary"
              onClick={() => {
                setActionOpen(true);
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

  const [tableData, setTableData] = useState<any>([]);
  const [current, setCurrent] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [activityRole, setActivityRole] = useState<any>(null);

  // console.log(setPage);

  const onChange: PaginationProps["onChange"] = (pageNo) => {
    setCurrent(pageNo);
    setPage(pageNo - 1);
  };

  useEffect(() => {
    const result = getLibraryDetails(id, token);
    result.then((res) => setData(res));
  }, [id, token]);

  useEffect(() => {
    fetch(`${globalalohaservice}/v1/activity/activityroles`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setActivityRole(data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    getLibraryMembers(page);
  }, [page]);

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < members?.length; i++) {
      const element = members[i];

      const roleDetails = activityRole?.find(
        (role: any) => role.Id === element.Roles[0].RoleId
      );
      let newData: any = {
        id: element.UserId,
        name: element.Name,
        member_type: roleDetails?.RoleName,
      };
      newArray.push(newData);
    }
    setTableData(newArray);
  }, [members]);

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
              <LibrarySidebar data={data} />
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
                  total={count}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <InviteModal open={open} onClose={onClose} fetchData={getLibraryMembers} /> */}
      <ActivityInvite open={open} onClose={onClose} fetchData={getLibraryMembers} activityRole={activityRole} />
      {/* <ActionModal open={actionOpen} onClose={onActionClose} /> */}
      <DeleteModal
        open={deleteModal}
        onClose={onDeleteClose}
        fetchData={getLibraryMembers}
        selected={selected}
        collection={members}
        page={page}
        type="library"
      />
    </>
  );
};

export default LibraryMember;
