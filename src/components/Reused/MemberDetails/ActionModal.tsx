import { Modal } from "antd";
import React from "react";

const ActionModal = ({ open, onClose }: any) => {
  return (
    <Modal title="Action" visible={open} onOk={onClose} onCancel={onClose}>
      <div>
        <h1>Action modal</h1>
      </div>
    </Modal>
  );
};

export default ActionModal;
