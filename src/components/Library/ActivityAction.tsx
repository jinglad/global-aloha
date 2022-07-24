import { Modal, Radio, RadioChangeEvent } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { globalalohaservice } from "../../services/globalalohaservice";

const ActivityAction = ({
  open,
  onClose,
  fetchData,
  activityRole,
  selected,
}: any) => {
  const { user, globalAccessToken: token } = useSelector(
    (state: any) => state.user
  );

  const [value, setValue] = useState<any>(null);
  const { id } = useRouter().query;

  const handleRole = async (e: RadioChangeEvent) => {
    setValue(e.target.value);
    // console.log(e.target.value);
    const updatedRole = [e.target.value];
    const response = await fetch(`${globalalohaservice}/v1/activity/${id}/members/${selected?.id}/change-role`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedRole)
    });
    if (response.ok) {
      alert("Activity Role Changes Successfully");
      fetchData();
      onClose();
    }
  };
  return (
    <Modal title="Action" visible={open} onOk={onClose} onCancel={onClose}>
      <div>
        <h4>Change Role</h4>
        <div>
          <Radio.Group onChange={handleRole} value={value}>
            {activityRole?.map((role: any) => (
              <Radio key={role.Id} value={role.Id}>
                {role.RoleName}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityAction;
