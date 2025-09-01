import { Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import DanhMucService from './Service';
import { modalSubject } from '../../Common/helpers/Observable';

export const DanhMucModalComponent: React.FC = () => {
  const [modalState, setModalState] = useState({ form: '' });

  useEffect(() => {
    const subscription = modalSubject.subscribe(setModalState);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Button onClick={() => DanhMucService.setOpenModal('category')}>Mở Modal</Button>

      <Modal
        title="Danh mục"
        open={modalState.form === 'category'}
        onOk={() => DanhMucService.setCloseModal('category')}
        onCancel={() => DanhMucService.setCloseModal('category')}
      >
        <p>Nội dung modal...</p>
      </Modal>
    </>
  );
};
