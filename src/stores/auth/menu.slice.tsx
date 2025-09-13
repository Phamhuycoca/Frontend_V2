import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuItem } from '../../Common/interface';



interface MenuState {
  menus: MenuItem[];
}

const initialState: MenuState = {
  menus: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<MenuItem[]>) {
      state.menus = action.payload;
    },
    clearMenus(state) {
      state.menus = [];
    },
  },
});

export const { setMenus, clearMenus } = menuSlice.actions;
export default menuSlice.reducer;
