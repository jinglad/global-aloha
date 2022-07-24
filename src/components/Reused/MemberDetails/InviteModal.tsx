import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRoles } from "../../../request/getRoles";
import Loader from "../Loader/Loader";

type FilterPropsType = {
  open: boolean;
  onClose: () => void;
  fetchData: () => void;
};

const InviteModal = ({ open, onClose, fetchData }: FilterPropsType) => {
  const [term, setTerm] = useState("");
  const { globalAccessToken:token, user, profile } = useSelector(
    (state: any) => state.user
  );
  const [result, setResult] = useState([]);
  const [invite, setInvite] = useState<any>([]);
  const [roles, setRoles] = useState<any>([]);
  const [value, setValue] = useState<any>([]);
  const [searchLoader, setsearchLoader] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  const handleOk = async () => {
    const response = await fetch(`https://api-gagroupservice-dev.saams.xyz/api/v1/group/${id}/collections`, {
      method: "POST",
      headers: {
        "content-type":"application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(invite)
    })

    if(response.ok) {
      setInvite(null);
      fetchData();
    }
  };

  const handleSearch = async () => {
    setsearchLoader(true);
    const response = await fetch(
      `https://api-profileservice-dev.saams.xyz/v2/profile/advancesearch?q=${term}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setsearchLoader(false);
    if (response.ok) {
      const res = await response.json();
      setResult(res);
      // console.log({res});
      setTerm("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (term.length > 0) {
        handleSearch();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    const newRoles = getRoles(
      token,
      user?.ApplicationId,
      user?.TenantId
    );
    newRoles.then((result) => setRoles(result));
  }, [user, token]);

  const handleRole = (index: number, role: string) => {
    const current = { ...invite[index] };
    if(current.Roles.length > 0) {
      current.Roles.pop();
      current.Roles.push(role);
    } else {
      current.Roles.push(role);
    }
    const newArray = [...invite];
    newArray[index] = current;
    setInvite(newArray);
  };

  return (
    <Modal
      title="Invite"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="link" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          className="py-3 px-2 bg-gray-100 rounded w-full outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTerm(e.target.value)
          }
        />
      </div>

      <div className="relative">
        {searchLoader ? (
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
          result?.length > 0 && (
            <div className="pb-3 h-48 overflow-y-scroll mt-2">
              {result.map((item: any) => (
                <p
                  key={item.id}
                  className="m-0 p-2 bg-gray-200 font-semibold cursor-pointer hover:bg-gray-400"
                  onClick={() => {
                    const newItem = [...invite];
                    newItem.push({
                      Body: `Hi,<br>I would like you to join my group: <strong>${item.firstName}</strong>`,
                      Email: item.email,
                      Name: item.firstName || "",
                      Photo: item.profilePhoto || "",
                      Roles: [],
                      Subject: `Invitation from ${profile.firstName} to Join Publish ${item.firstName}`,
                      UserId: item.userId,
                    });
                    setInvite(newItem);
                    setResult([]);
                  }}
                >
                  {item.email}
                </p>
              ))}
            </div>
          )
        )}
      </div>

      {invite?.length > 0 && (
        <div className="pb-3 h-48 overflow-y-scroll mt-2">
          {invite.map((item: any, i: number) => (
            <div key={item?.UserId} className="p-2 bg-gray-100 mb-1">
              <p className="m-0 mb-1 font-bold">{item.Email}</p>
              <div>
                {roles?.map((role: any) => (
                  <Button
                    onClick={() => handleRole(i, role.Id)}
                    key={role.RoleType}
                    className="mr-1"
                    type={item.Roles.includes(role.Id) ? "primary" : "default"}
                  >
                    {role.RoleName}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default InviteModal;
