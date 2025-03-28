import baseApi from '../../config/baseApi';
import { IAuthUserResponse, ILoginUserData, IRegistrationUserData } from '../models/user';
import { logout, setCredentials } from '../slices/userSlice';

const userApi = baseApi.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IAuthUserResponse, IRegistrationUserData>({
      query: (data) => ({
        url: 'users/registration',
        method: 'POST',
        body: { ...data },
      }),
    }),
    login: builder.mutation<IAuthUserResponse, ILoginUserData>({
      query: (data) => ({
        url: 'users/login',
        method: 'POST',
        body: { ...data },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(baseApi.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation<IAuthUserResponse, void>({
      query: () => ({
        url: 'users/refresh',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, role } = data;
          dispatch(setCredentials({ accessToken, role }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useRefreshMutation } =
  userApi;
