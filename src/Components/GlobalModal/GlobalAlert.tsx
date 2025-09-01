import { useEffect } from 'react';
import { modalAlert, type AlertState } from '../../Common/helpers/Observable';
import { Modal } from 'antd';

export const GlobalAlert: React.FC = () => {
  useEffect(() => {
    const sub = modalAlert.subscribe((state: AlertState) => {
      if (!state.content) return;

      switch (state.type) {
        case 'success':
          Modal.success({ title: state.title || 'Thành công', content: state.content,okText:'Đóng' });
          break;
        case 'error':
          Modal.error({ title: state.title || 'Lỗi', content: state.content,okText:'Đóng' });
          break;
        default:
          Modal.info({ title: state.title || 'Thông tin', content: state.content,okText:'Đóng' });
          break;
      }
    });

    return () => sub.unsubscribe();
  }, []);

  return null; // không render gì
};
