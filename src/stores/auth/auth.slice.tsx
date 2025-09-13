import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StateStore {
  email: string | null;
  isAuthenticated: boolean;
  user_id: string | null;
  role: string | null;
  token: string | null;
  refresh_token: string | null;
}

const initialState: StateStore = {
  email: null,
  isAuthenticated: false,
  role: null,
  user_id: null,
  refresh_token: null,
  token: null,
};

interface AuthPayload {
  email: string;
  user_id: string;
  role: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<AuthPayload>) {
      state.email = action.payload.email;
      state.user_id = action.payload.user_id;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.token = localStorage.getItem("access_token");
      state.refresh_token = localStorage.getItem("refresh_token");
    },
    logout(state) {
      state.email = null;
      state.user_id = null;
      state.role = null;
      state.isAuthenticated = false;
      state.token = null;
      state.refresh_token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setData, logout } = authSlice.actions;
export default authSlice.reducer;
