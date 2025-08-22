import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import UserRole from '@config/userRoles';

const authSession = Cookies.get('authSession') as UserRole | undefined;

interface IUserState {
  token: string | null;
  role: UserRole | undefined | null;
  isLogged: boolean;
}

const initialState: IUserState = {
  token: null,
  role: authSession,
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
      return { ...initialState, role: null, isLogged: false };
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
