import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSession = Cookies.get('authSession');

interface IUserState {
  token: string | null;
  role: string | null;
  isLogged: boolean;
}

const initialState: IUserState = {
  token: null,
  role: null,
  isLogged: !!authSession,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.role = action.payload.role;
      state.isLogged = true;
    },
    logout: () => {
      return { ...initialState, isLogged: false };
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
