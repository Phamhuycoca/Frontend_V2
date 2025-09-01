import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MetaState } from '../../Common/interface';

interface StateStore<T = any> {
  meta: MetaState;
  data: T[];
  total?: number;
}

const initialState: StateStore = {
  meta: {
    page: 1,
    page_size: 10,
    search: '',
    sort: '',
    filter: '',
  },
  data: [],
  total: 0,
};

const nguoidungSlice = createSlice({
  name: 'nguoidung',
  initialState,
  reducers: {
    setMeta(state, action: PayloadAction<Partial<MetaState>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
  },
});

export const { setData, setMeta, setTotal } = nguoidungSlice.actions;
export default nguoidungSlice.reducer;
