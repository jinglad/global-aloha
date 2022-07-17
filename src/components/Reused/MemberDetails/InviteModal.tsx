import { Button, Modal, Radio, RadioChangeEvent } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRoles } from "../../../request/getRoles";

type FilterPropsType = {
  open: boolean;
  onClose: () => void;
};

const InviteModal = ({ open, onClose }: FilterPropsType) => {
  const [term, setTerm] = useState("");
  const { globalAccessToken, user, profile } = useSelector(
    (state: any) => state.user
  );
  const [result, setResult] = useState([]);
  const [invite, setInvite] = useState<any>([]);
  const [roles, setRoles] = useState<any>([]);
  const [value, setValue] = useState<any>([]);

  const handleOk = () => {
    console.log(invite);
  };

  const handleSearch = async () => {
    const response = await fetch(
      `https://api-profileservice-dev.saams.xyz/v2/profile/advancesearch?q=${term}`,
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
      setResult(res);
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
      globalAccessToken,
      user.ApplicationId,
      user.TenantId
    );
    newRoles.then((result) => setRoles(result));
  }, []);

  const handleRadio = (e: RadioChangeEvent) => {
    const newData = [...value];
    newData.push(e.target.value);
    setValue(newData);
  };

  const handleRole = (index: number, role: string) => {
    const current = { ...invite[index] };
    current.Roles.push(role);
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
            // handleSearch(e.target.value)
            setTerm(e.target.value)
          }
        />
      </div>

      {result?.length > 0 && (
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
                  UserId: user.id,
                });
                setInvite(newItem);
                setResult([]);
              }}
            >
              {item.email}
            </p>
          ))}
        </div>
      )}

      {invite?.length > 0 && (
        <div className="pb-3 h-48 overflow-y-scroll mt-2">
          {invite.map((item: any, i:number) => (
            <div className="p-2 bg-gray-100">
              <p className="m-0 mb-1 font-bold">{item.Email}</p>
              <div>
                <Radio.Group onChange={handleRadio} value={value}>
                  {roles?.map((role: any) => (
                    <Radio
                      key={role.RoleType}
                      value={role.RoleType}
                      onClick={() => handleRole(i, role.Id)}
                      // checked={}
                    >
                      {role.RoleName}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default InviteModal;
