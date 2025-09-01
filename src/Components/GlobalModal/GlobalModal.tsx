import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { modalConfirm$, type ModalConfirmState } from '../../Common/helpers/Observable';

export const GlobalModal = () => {
  const [state, setState] = useState<ModalConfirmState | null>(null);

  useEffect(() => {
    const sub = modalConfirm$.subscribe((res) => {
      setState(res);
    });
    return () => sub.unsubscribe();
  }, []);

  if (!state) return null;

  return (
    <Modal
      title={state.title || 'Xác nhận'}
      open={!!state}
      onOk={() => {
        state.resolve(true);
        setState(null);
      }}
      cancelText='Đóng'
      okText='Xóa'
      onCancel={() => {
        state.resolve(false);
        setState(null);
      }}
    >
      <p>{state.content || 'Bạn có chắc chắn không?'}</p>
    </Modal>
  );
};
