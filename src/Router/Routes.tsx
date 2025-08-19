import type { RouteConfig } from '../Common/interface';
import AdminModule from '../layout/Admin/Module';
import { DanhMucModule } from '../Modules/admin.danh_muc/DanhMucModule';
import NoutFountPage from '../shared/page/NoutFound';

export const routes: RouteConfig[] = [
  {
    path: '/',
    protected: false,
    element: <AdminModule />,
    children: [
      {
        path: 'danh-muc/*',
        protected: false,
        element: <DanhMucModule />,
      },
    ],
  },
  {
    path: '*',
    element: <NoutFountPage />,
  },
];
