import React, { useState } from 'react';
import { TableBase } from '../../Components/TableCp/TableBase';
import UserTable from './UserTable';
interface User {
  id: number;
  name: string;
  age: number;
  address: string;
}
export const DanhMucListCp: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const data: User[] = [
    { id: 1, name: 'Nguyễn Văn A', age: 25, address: 'Hà Nội' },
    { id: 2, name: 'Trần Văn B', age: 30, address: 'HCM' },
    { id: 3, name: 'Lê Văn C', age: 22, address: 'Đà Nẵng' },
    { id: 4, name: 'Phạm Thị D', age: 27, address: 'Cần Thơ' },
    { id: 5, name: 'Ngô Văn E', age: 35, address: 'Huế' },
    { id: 6, name: 'Hoàng Văn F', age: 29, address: 'Quảng Ninh' },
  ];

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Tuổi', dataIndex: 'age', key: 'age' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
  ];

  return (
    <>
      {/* <TableBase<User>
        page={page}
        page_size={pageSize}
        columns={columns}
        dataSource={data}
        total={1}
        onChange={(pagination) => setPage(pagination.current || 1)}
      /> */}
      <UserTable/>
    </>
  );
};
