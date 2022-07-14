import { Button, Modal } from "antd";
import React from "react";

type propsType = {
  open: boolean;
  onClose: () => void;
  type: string,
  children: React.ReactNode,
  handleFilter: () => void,
};

const FilterModal = ({ open, onClose, type, children, handleFilter }: propsType) => {
  return (
    <Modal
      title={`Filter ${type}`}
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="link" type="primary" onClick={() => {
            handleFilter();
            onClose();
        }}>
          Submit
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default FilterModal;
