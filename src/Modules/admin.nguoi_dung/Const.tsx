export type NguoiDungType = {
  ho: string;
  ten: string;
  full_name: string;
  is_admin: boolean;
  mat_khau: string;
  tai_khoan: string;
  id: string;
};
export const lstLoaiTaiKhoan = [
  {
    value: true,
    label: 'Đang hoạt động',
  },
  {
    value: false,
    label: 'Đã khóa',
  },
];
