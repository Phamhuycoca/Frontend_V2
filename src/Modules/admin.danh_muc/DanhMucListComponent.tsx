import { Col, Row, type TableProps } from 'antd';
import BreadcrumBase from '../../Components/Breadcrumb/BreadcrumBase';
import { TableBase } from '../../Components/TableCp/TableBase';
import { useEffect, useState } from 'react';
import DanhMucService from './Service';
import { CreateButton } from '../../Components/Button';
type DanhMucType = {
  ten: string;
  icon: string;
  so_thu_tu: string;
  duong_dan: string;
  cap_ten_id: string;
  id: string;
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
        dataIndex: 'ten',
        key: 'ten',
        render(index) {
            return <a>{index+1}</a>
        },
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
      },
      {
        title: 'Đường dẫn',
        dataIndex: 'duong_dan',
        key: 'duong_dan',
      },
      {
        title: 'Hành động',
      },
    ]);
  }, []);
  return (
    <>
      <BreadcrumBase customTitles={'Danh mục'} />
      <Row className="mt-2">
        <Col span={24}>
          <TableBase<DanhMucType>
            ActionButton={
              <CreateButton/>
            }
            isSearch={true}
            columns={columns}
            dataSource={dataSource}
            isLoading={false}
            page={1}
            page_size={10}
            total={20}
            arrFilterForm={[]}
          />
        </Col>
      </Row>
    </>
  );
};
