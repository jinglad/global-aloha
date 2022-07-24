import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { gagroupservice } from "../../../services/gagroupservice";
import Loader from "../Loader/Loader";

const DeleteModal = ({
  open,
  onClose,
  fetchData,
  selected,
  collection,
  page,
  type,
}: any) => {
  const { globalAccessToken: token, user } = useSelector(
    (state: any) => state.user
  );
  const { id } = useRouter().query;
  const [loading, setLoading] = useState(false);

  const removeUser = async () => {
    setLoading(true);
    if (type !== "library") {
      const obj = collection?.find(
        (item: any) => item.CollectionId === selected.id
      );
      const response = await fetch(
        `${gagroupservice}/api/v1/group/${obj.GroupId}/collections`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            GroupId: obj.GroupId,
            CollectionId: obj.CollectionId,
          }),
        }
      );
      setLoading(false);
      if (response.ok) {
        fetchData(page);
        onClose();
      }
    } else {
      const response = await fetch(
        `https://api-globalalohaservice-dev.saams.xyz/v1/activity/${id}/members/${selected?.id}/remove`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response.ok) {
        fetchData(page);
        onClose();
      }
    }
  };

  return (
    <Modal
      title=""
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="link" type="primary" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <div className="relative">
        {!loading ? (
          <>
            <h4 className="text-center font-bold text-xl">
              Do you want to remove the user?
            </h4>
            <div className="text-center">
              <Button
                className="mr-3"
                type="primary"
                onClick={() => removeUser()}
              >
                Yes
              </Button>
              <Button type="ghost" onClick={onClose}>
                No
              </Button>
            </div>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeleteModal;
