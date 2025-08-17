import type { RouteConfig } from '../Common/interface';
import AdminModule from '../layout/Admin/Module';
import { DanhMucListCp } from '../Modules/admin.danh_muc/DanhMucListCp';

export const routes: RouteConfig[] = [
  {
    path: '/',
    protected: false,
    element: <AdminModule />,
    children: [
      {
        path: 'danh-muc',
        protected: false,
        element: <DanhMucListCp />,
      },
    ],
  },
];
