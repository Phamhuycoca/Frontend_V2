import { useEffect, useState } from 'react';
import { TableBase } from '../../Components/TableCp/TableBase';
import { Button } from 'antd';
import { CreateButton } from '../../Components/Button/CreateButton';
import { EditButton } from '../../Components/Button/EditButton';
import { DeleteButton } from '../../Components/Button/DeleteButton';
import { SaveButton } from '../../Components/Button/SaveButton';
import { CommonButton } from '../../Components/Button/CommonButton';
import DanhMucService from './Service';
interface User {
  id: string;
  ten: string;
  icon: string;
  duong_dan: string | null;
}

const UserTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<string>('');
  const [search, setSearch] = useState<String>('');
  const [filter, setFilter] = useState({});
  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      const res = await DanhMucService.getAll({
          page: page,
          page_size: pageSize,
          key_search: search,
          filter: filter,
          sort: sort,
        })
      setData(res.data);
      setTotal(res.total||0);
    } catch (err) {
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, pageSize);
  }, [page, pageSize, sort, search, filter]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
    { title: 'ten', dataIndex: 'ten', key: 'ten', sorter: true },
    { title: 'so_thu_tu', dataIndex: 'so_thu_tu', key: 'so_thu_tu', render: (r: string | null) => r || 'N/A' },
  ];

  return (
    <TableBase<User>
      isLoading={loading}
      isSearch={true}
      page={page}
      page_size={pageSize}
      total={total}
      columns={columns}
      dataSource={data}
      loading={loading}
      ActionButton={
        <>
          <CreateButton />
          <EditButton />
          <DeleteButton />
          <SaveButton />
          <CommonButton text='Thêm mới'/>
          <Button>Thêm mới</Button>
          <Button>Thêm mới</Button>
        </>
      }
      arrFilterForm={[
        { label: 'Tài khoản', name: 'Username', type: 'text' },
        { label: 'Email', name: 'Email', type: 'text' },
        {
          label: 'Trạng thái',
          name: 'status',
          type: 'select',
          data: [
            { label: 'Hoạt động', value: 'active' },
            { label: 'Ngừng hoạt động', value: 'inactive' },
          ],
        },
        {
          label: 'Ngày tạo',
          name: 'createdDate',
          type: 'date',
        },
        {
          label: 'Danh mục',
          name: 'category',
          type: 'treeselect',
          data: [
            {
              label: 'Danh mục A',
              value: 'a',
              children: [
                { title: 'Danh mục A1', value: 'a1' },
                { title: 'Danh mục A2', value: 'a2' },
              ],
            },
            { label: 'Danh mục B', value: 'b' },
          ],
        },
        { label: 'Đã duyệt', name: 'approved', type: 'checkbox' },
      ]}
      onChangeTable={({ page, pageSize, sort, filters, search }) => {
        console.log('filters', filters);
        setFilter(filters ? JSON.stringify(filters) : '');
        setSearch(search || '');
        setPage(page);
        setPageSize(pageSize);
        setSort(sort || '');
      }}
    />
  );
};

export default UserTable;
