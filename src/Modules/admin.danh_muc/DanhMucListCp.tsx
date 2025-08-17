import React from 'react';
import UserTable from './UserTable';

export const DanhMucListCp: React.FC = () => {
 
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
