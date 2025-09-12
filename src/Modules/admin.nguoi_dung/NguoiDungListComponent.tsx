import { Button, Col, Flex, Row, type TableProps } from 'antd';
import BreadcrumBase from '../../Components/Breadcrumb/BreadcrumBase';
import { TableBase } from '../../Components/TableCp/TableBase';
import { useEffect, useState } from 'react';
import NguoiDungService from './Services';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setMeta, setTotal } from '../../stores/admin.nguoi_dung/admin.nguoi_dung.slice';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CreateButton } from '../../Components/Button';
import { NguoiDungModalComponent } from './NguoiDungModalComponent';
import { lstGioiTinh, type NguoiDungType } from './Const';
import { modalAlert, showModalConfirm } from '../../Common/helpers/Observable';

export const NguoiDungListComponent: React.FC = () => {
  const [columns, setColumns] = useState<TableProps<NguoiDungType>['columns']>([]);
  const dispatch = useDispatch();
  const { data, meta, total } = useSelector((state: any) => state.nguoidung);
  const { page, page_size, sort, search, filter } = meta;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [page, page_size, sort, search, filter]);
  const fetchData = async () => {
    setLoading(true);
    const res = await NguoiDungService.getAll({
      page: page,
      page_size: page_size,
      key_search: search,
      filter: filter,
      sort: sort,
    });
    if (res.success) {
      dispatch(setData(res.items));
      dispatch(setTotal(res.meta?.total || 0));
    }
    setLoading(false);
  };
  useEffect(() => {
    setColumns([
      {
        title: 'STT',
        render: (_: any, __: any, index: number) => <a>{index + 1}</a>,
      },
      {
        title: 'Họ và tên',
        dataIndex: 'ho_va_ten',
        key: 'ho_va_ten',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Giới tính',
        dataIndex: 'gioi_tinh',
        key: 'gioi_tinh',
        render(record) {
          return <span>{lstGioiTinh.find((x) => x.value == record)?.label}</span>;
        },
      },
      {
        title: 'Hành động',
        align: 'center',
        width: '15%',
        render(value) {
          return (
            <>
              <Flex gap="small" wrap>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    NguoiDungService.setOpenModal('category', { id: value.id });
                  }}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="red"
                  icon={<DeleteOutlined />}
                  onClick={async () => {
                    const result = await showModalConfirm('Thông báo', 'Bạn có chắc muốn xóa?');
                    if (result) {
                      const res = await NguoiDungService.delete(value.id);
                      if (res.success) {
                        modalAlert.next({
                          type: 'success',
                          title: 'Thông báo',
                          content: 'Xóa thông tin thành công!',
                        });
                        fetchData();
                      }
                    }
                  }}
                >
                  Xóa
                </Button>
              </Flex>
            </>
          );
        },
      },
    ]);
  }, []);
  const handleClose = () => {
    console.log('ressss');
    // setTimeout(()=>{
    fetchData();
    // },5000);
  };
  return (
    <>
      <BreadcrumBase customTitles={'Người dùng'} />
      <Row className="mt-2">
        <Col span={24}>
          <TableBase<NguoiDungType>
            ActionButton={
              <>
                <CreateButton
                  onClick={() => {
                    NguoiDungService.setOpenModal('category');
                  }}
                />
              </>
            }
            isSearch={true}
            columns={columns}
            dataSource={data}
            isLoading={loading}
            page={page}
            page_size={page_size}
            total={total}
            search={search}
            arrFilterForm={[
              {
                label: 'Chọn trạng thái',
                name: 'is_loai_tai_khoan',
                type: 'select',
                data: lstGioiTinh,
              },
            ]}
            onChangeTable={({ page, pageSize, sort, filters, search }) => {
              dispatch(
                setMeta({
                  page: page,
                  page_size: pageSize,
                  filter: filters ? JSON.stringify(filters) : '',
                  search: search || '',
                  sort: sort || '',
                }),
              );
            }}
          />
        </Col>
      </Row>
      <NguoiDungModalComponent
        handleClose={() => {
          handleClose();
        }}
      />
    </>
  );
};
