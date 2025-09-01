import { Modal, Form, Row, Col, Input, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import NguoiDungService from './Services';
import { lstLoaiTaiKhoan, type NguoiDungType } from './Const';
import { modalAlert } from '../../Common/helpers/Observable';
type Props = {
  handleClose: () => void;
};
export const NguoiDungModalComponent: React.FC<Props> = ({ handleClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //const [editMode, setEditMode] = useState<boolean>(false);
  const [data, setData] = useState<NguoiDungType | null>(null);
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const subscription = NguoiDungService.modal$.subscribe((res) => {
      if (res.form) {
        setIsOpen(true);
      }
      if (res.data) {
        setTitle('Thông tin chi chi tiết');
        fetchDataById(res.data.id);
      } else {
        setTitle('Thêm mới thông tin');
        console.log(data);
        setData(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [NguoiDungService]);
  const fetchDataById = (id: string) => {
    setIsLoading(true);
    NguoiDungService.getById(id).then((res) => {
      setData(res.data);
      form.setFieldsValue(res.data);
      //setEditMode(true);
      setIsLoading(false);
    });
  };
  const onFinish = (value: object) => {
    const res = { ...data, ...value };
    console.log(res!.id);
    if (res!.id != undefined) {
      NguoiDungService.update(res.id, res).then((res) => {
        if (res.success) {
          modalAlert.next({
            type: 'success',
            title: 'Thông báo',
            content: 'Cập nhật thông tin thành công!',
          });
          closed();
        }
      });
    } else {
      NguoiDungService.create(res).then((res) => {
        if (res.success) {
          modalAlert.next({
            type: 'success',
            title: 'Thông báo',
            content: 'Thêm mới thông tin thành công!',
          });
          closed();
        }
      });
    }
    setIsOpen(false);
  };
  const closed = () => {
    handleClose();
    form.resetFields();
  };
  return (
    <>
      <Modal
        width={'70%'}
        title={title}
        open={isOpen}
        onOk={() => {
          form.submit();
        }}
        okText='Lưu'
        cancelText="Đóng"
        onCancel={() => {
          (setIsOpen(false), form.resetFields());
        }}
      >
        <Spin spinning={isLoading}>
          <Form form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="ho" label="Họ">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="ten" label="Tên">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="tai_khoan" label="Tài khoản" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="is_loai_tai_khoan" label="Loại tài khoản">
                  <Select options={lstLoaiTaiKhoan} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
