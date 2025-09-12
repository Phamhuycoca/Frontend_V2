import type { RouteConfig } from '../Common/interface';
import AdminModule from '../layout/Admin/Module';
import { LoginFormComponent } from '../layout/Auth/LoginFormComponent';
import { DanhMucModule } from '../Modules/admin.danh_muc/DanhMucModule';
import { NguoiDungModule } from '../Modules/admin.nguoi_dung/NguoiDungModule';
import NoutFountPage from '../shared/page/NoutFound';

export const routes: RouteConfig[] = [
  {
    path: '/admin',
    protected: false,
    element: <AdminModule />,
    children: [
      {
        path: 'danh-muc/*',
        protected: false,
        element: <DanhMucModule />,
      },
      {
        path: 'nguoi-dung/*',
        protected: false,
        element: <NguoiDungModule />,
      },
    ],
  },
  {
    path:'/login',
    protected:false,
    element:<LoginFormComponent/>
  },
  {
    path: '*',
    element: <NoutFountPage />,
  },
];
