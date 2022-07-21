import { Modal, Radio, RadioChangeEvent } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useToken from "../../../hooks/useToken";
import { getRoles } from "../../../request/getRoles";

const ActionModal = ({ open, onClose, selected }: any) => {
  const token = useToken();
  const { user } = useSelector((state: any) => state.user);
  // console.log(user)
  const [roles, setRoles] = useState<any>(null);
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    const newRoles = getRoles(token, user?.ApplicationId, user?.TenantId);
    newRoles.then((result) => {
      setRoles(result);
    });
  }, [token]);

  const handleRole = (e: RadioChangeEvent) => {
    setValue(e.target.value);
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
