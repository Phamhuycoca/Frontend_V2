import { configureStore } from '@reduxjs/toolkit';
import nguoidungSlice from './admin.nguoi_dung/admin.nguoi_dung.slice';
export const store = configureStore({
  reducer: {
    nguoidung:nguoidungSlice,
  },
});

// Tạo type RootState và AppDispatch để dùng trong app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;