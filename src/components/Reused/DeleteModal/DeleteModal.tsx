import { Button, Modal } from 'antd'
import React from 'react'
import useToken from '../../../hooks/useToken';
import { gagroupservice } from '../../../services/gagroupservice';

const DeleteModal = ({open, onClose, fetchData, selected, collection, page }: any) => {
  const token = useToken();

  const removeUser = async () => {
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

    if (response.ok) {
      fetchData(page);
      onClose();
    }
  };


  return (
    <Modal title="" visible={open} onCancel={onClose} footer={[
      <Button key="link" type="primary" onClick={onClose}>
        Close
      </Button>,
    ]}>
      <div>
        <h4 className='text-center font-bold text-xl'>Do you want to remove the user?</h4>
        <div className='text-center'>
          <Button className='mr-3' type="primary" onClick={() => removeUser()}>Yes</Button>
          <Button type="ghost" onClick={onClose}>No</Button> 
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal