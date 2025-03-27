import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  token: string | null;
  role: string | null;
}

const initialState: IUserState = {
  token: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.role = action.payload.role;
    },
    logout: () => {
      return { ...initialState };
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
