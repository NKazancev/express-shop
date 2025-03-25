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
    logOut: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;
