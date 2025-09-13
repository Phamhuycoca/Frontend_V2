import { Button, Col, Flex, Row, type TableProps } from 'antd';
import BreadcrumBase from '../../Components/Breadcrumb/BreadcrumBase';
import { TableBase } from '../../Components/TableCp/TableBase';
import { useEffect, useState } from 'react';
import DanhMucService from './Service';
import { CreateButton } from '../../Components/Button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { modalAlert, showModalConfirm } from '../../Common/helpers/Observable';
import { DanhMucModalComponent } from './DanhMucModalComponent';
import { renderIcon } from '../../Components/Icon/IconCommon';
export type DanhMucType = {
  ten: string;
  icon: string;
  so_thu_tu: string;
  duong_dan: string;
  cap_ten_id: string;
  id: string;
  children?:DanhMucType[]
};
export const DanhMucListComponent: React.FC = () => {
  const [columns, setColumns] = useState<TableProps<DanhMucType>['columns']>([]);
  const [dataSource, setDataSource] = useState<DanhMucType[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await DanhMucService.getAll();
    setDataSource(res.items);
  };
  useEffect(() => {
    setColumns([
      {
        title: 'STT',
        render: (_: any, __: any, index: number) => <a>{index + 1}</a>,
      },
      {
        title: 'Tên',
        dataIndex: 'ten',
        key: 'ten',
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        render: (iconName: string) => renderIcon(iconName),
      },
      {
        title: 'Hành động',
        render(value) {
         if(value.children == 0){
           return (
            <>
              <Flex gap="small" wrap>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    DanhMucService.setOpenModal('category', { id: value.id });
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
                      const res = await DanhMucService.delete(value.id);
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
         }else{
           return (
            <>
              <Flex gap="small" wrap>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    DanhMucService.setOpenModal('category', { id: value.id });
                  }}
                >
                  Chỉnh sửa
                </Button>
                </Flex>
                </>)
         }
        },
      },
    ]);
  }, []);
  const handleClose=()=>{
    fetchData();
  }
  return (
    <>
      <BreadcrumBase customTitles={'Danh mục'} />
      <Row className="mt-2">
        <Col span={24}>
          <TableBase<DanhMucType>
            ActionButton={<CreateButton onClick={
              ()=>{
                DanhMucService.setOpenModal('category');
              }
            } />}
            isSearch={true}
            columns={columns}
            dataSource={dataSource}
            isLoading={false}
            page={1}
            page_size={10}
            total={20}
            arrFilterForm={[]}
            expandable={{
              showExpandColumn:true,
              defaultExpandAllRows:true,
            }}
          />
        </Col>
      </Row>
      <DanhMucModalComponent handleClose={()=>{
        handleClose()
      }}/>
    </>
  );
};
