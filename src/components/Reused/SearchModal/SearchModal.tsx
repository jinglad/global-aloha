import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchKey } from "../../../Redux/librarySlice";

type SearchPropsType = {
  open: boolean;
  onClose: () => void;
};

const SearchModal = ({ open, onClose }: SearchPropsType) => {
  const [term, setTerm] = useState("");
  //   const dispatch = useDispatch();
  const router = useRouter();

  const handleSearch = (key: string) => {
    setTerm(key);
  };

  const handleOk = () => {
    // dispatch(setSearchKey(term));
    onClose();
    router.push(`/search?key=${term}`);
  };

  return (
    <Modal
      title="Search item"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="link" type="primary" onClick={handleOk}>
          Search
        </Button>,
      ]}
    >
      <div>
        <input
          type="text"
          placeholder="search"
          className="py-3 px-2 bg-gray-100 rounded w-full outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
        />
      </div>
    </Modal>
  );
};

export default SearchModal;
