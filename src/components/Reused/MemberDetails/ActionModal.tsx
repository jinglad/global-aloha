import { Modal, Radio, RadioChangeEvent } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRoles } from "../../../request/getRoles";
import { gagroupservice } from "../../../services/gagroupservice";

const ActionModal = ({ open, onClose, selected, fetchData }: any) => {
  const { user, globalAccessToken:token} = useSelector((state: any) => state.user);
  // console.log(user)
  const [roles, setRoles] = useState<any>(null);
  const [value, setValue] = useState<any>(null);
  const {id} = useRouter().query;

  useEffect(() => {
    getRoles(token, user?.ApplicationId, user?.TenantId).then((result) => {
      setRoles(result);
    });
  }, [token, user]);

  const handleRole = async (e: RadioChangeEvent) => {
    setValue(e.target.value);
    // console.log(e.target.value);
    const response = await fetch(`${gagroupservice}/api/v1/group/${id}/collections/roles/${selected?.CollectionId}/${e.target.value}`, {
      method: "PUT",
      headers: {
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
    })
    if(response.ok) {
      alert("Role Changes Successfully");
      fetchData();
      onClose();
    }
  };

  return (
    <Modal title="Action" visible={open} onOk={onClose} onCancel={onClose}>
      <div>
        <h4>Change Role</h4>
        <div>
          {selected?.IsAlreadyMember && (
            <Radio.Group onChange={handleRole} value={value}>
              {roles?.map((role: any) => (
                <Radio key={role.Id} value={role.Id}>
                  {role.RoleName}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
