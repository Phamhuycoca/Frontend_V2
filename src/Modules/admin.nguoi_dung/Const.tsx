export type NguoiDungType = {
  gioi_tinh: boolean;
  ho_va_ten: string;
  email: string;
  id: string;
  lockoutEnabled: boolean;
};
export const lstGioiTinh = [
  {
    value: true,
    label: 'Nam',
  },
  {
    value: false,
    label: 'Nữ',
  },
];
export const lstTrangThai = [
  {
    value: false,
    label: 'Đang hoạt động',
  },
  {
    value: true,
    label: 'Đã khóa',
  },
];
