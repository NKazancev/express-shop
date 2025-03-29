import baseApi from '../../config/baseApi';
import { IAuthResponse, ILoginData } from '../models/auth';
import { logout, setCredentials } from '../slices/userSlice';

const authApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Auth'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<IAuthResponse, ILoginData>({
        query: (data) => ({
          url: 'auth/login',
          method: 'POST',
          body: { ...data },
        }),
      }),

      logout: builder.mutation({
        query: () => ({
          url: 'auth/logout',
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

      refresh: builder.mutation<IAuthResponse, void>({
        query: () => ({
          url: 'auth/refresh',
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

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApi;
