import baseApi from '@config/baseApi';
import { IAuthResponse, ILoginData } from '@shared/models/auth';
import { resetFilters } from '@shared/slices/filtersSlice';
import { logout, setCredentials } from '@shared/slices/userSlice';
import toast from 'react-hot-toast';

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
        invalidatesTags: ['Auth'],
      }),

      logout: builder.mutation<void, void>({
        query: () => ({
          url: 'auth/logout',
          method: 'POST',
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(logout());
            dispatch(resetFilters());
            dispatch(baseApi.util.resetApiState());
            localStorage.clear();
          } catch (error) {
            toast.error('Something went wrong');
          }
        },
        invalidatesTags: ['Auth'],
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
            toast.error('Something went wrong');
          }
        },
        invalidatesTags: ['Auth'],
      }),
    }),
  });

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApi;
