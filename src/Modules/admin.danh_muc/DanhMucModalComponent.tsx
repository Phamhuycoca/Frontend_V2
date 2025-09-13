import { Modal, Form, Input, Row, Col, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import DanhMucService from './Service';
import type { InterfaceTreeSelect } from '../../Common/interface';
import type { DanhMucType } from './DanhMucListComponent';
import { modalAlert } from '../../Common/helpers/Observable';
import { EditButton, SaveButton } from '../../Components/Button';
import { CloseButton } from '../../Components/Button/CloseButton';
type Props = {
  handleClose: () => void;
};
export const DanhMucModalComponent: React.FC<Props> = ({ handleClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const [danhMuc, setDanhMuc] = useState<InterfaceTreeSelect[]>([]);
  const [data, setData] = useState<DanhMucType | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const subscription = DanhMucService.modal$.subscribe((res) => {
      if (res.form) {
        setIsOpen(true);
        if (res.data) {
          form.resetFields();
          setTitle('Thông tin chi tiết');
          fetchDataById(res.data.id);
        } else {
          setTitle('Thêm mới thông tin');
          form.resetFields();
          setData(null);
          setEditMode(false);
        }
      }
      _getDanhMuc();
    });
    return () => subscription.unsubscribe();
  }, []);

  const mapTreeData = (data: DanhMucType[]): InterfaceTreeSelect[] =>
    data.map((e) => ({
      value: e.id,
      label: e.ten,
      children: e.children ? mapTreeData(e.children) : [],
    }));

  const _getDanhMuc = async () => {
    const res = await DanhMucService.getAll();
    const data = mapTreeData(res.items);
    setDanhMuc(data);
  };

  const closed = () => {
    setIsOpen(false);
    form.resetFields();
    DanhMucService.resetModal();
  };
  const onFinish = (value: object) => {
    const res = { ...data, ...value };
    console.log(res!.id);
    if (res!.id != undefined) {
      DanhMucService.update(res.id, res).then((res) => {
        if (res.success) {
          modalAlert.next({
            type: 'success',
            title: 'Thông báo',
            content: 'Cập nhật thông tin thành công!',
          });
          handleClose();
          form.resetFields();
        }
      });
    } else {
      DanhMucService.create(res).then((res) => {
        if (res.success) {
          modalAlert.next({
            type: 'success',
            title: 'Thông báo',
            content: 'Thêm mới thông tin thành công!',
          });
          handleClose();
          form.resetFields();
        }
      });
    }
    setIsOpen(false);
  };
  const fetchDataById = (id: string) => {
    DanhMucService.getById(id)
      .then((res) => {
        setData(res.data);
        form.setFieldsValue(res.data);
        setEditMode(true);
        //setEditMode(true);
      })
      .catch(() => {
        modalAlert.next({
          type: 'error',
          title: 'Thông báo',
          content: 'Đã có lỗi xảy ra, vui lòng thử lại!',
        });
      });
  };
  const edit = () => {
    setEditMode(false);
    setTitle('Chỉnh sửa thông tin');
  };
  return (
    <Modal
      width="55%"
      okText="Lưu"
      cancelText="Đóng"
      title={title}
      open={isOpen}
      onOk={() => {
        form.submit();
      }}
      onCancel={closed}
      footer={<>
      {!editMode ? <SaveButton onClick={() => form.submit()} /> : <EditButton onClick={edit} />}
      <CloseButton onClick={closed}/>
      </>}
    >
      <Form
        initialValues={{
          duong_dan: '/',
        }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={editMode}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="ten" label="Tên danh mục" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="icon" label="Icon">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="so_thu_tu" label="Số thứ tự">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="danh_muc_cha_id" label="Danh mục cấp trên">
              <TreeSelect treeData={danhMuc} allowClear placeholder="Chọn danh mục cấp trên" />
            </Form.Item>
          </Col>
           <Col span={12}>
            <Form.Item name="duong_dan" label="Đường dẫn">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
