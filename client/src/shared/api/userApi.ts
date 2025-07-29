import baseApi from '@config/baseApi';
import { IAuthResponse } from '@shared/models/auth';
import {
  IPasswordData,
  IUser,
  TCreateUserData,
  TUserCart,
  TUserInfo,
} from '@shared/models/user';

const userApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Users'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createUser: builder.mutation<IAuthResponse, TCreateUserData>({
        query: (data) => ({
          url: 'users/registration',
          method: 'POST',
          body: { ...data },
        }),
        invalidatesTags: ['Users'],
      }),

      getUserCart: builder.query<TUserCart, void>({
        query: () => ({
          url: 'users/cart',
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),

      getUserInfo: builder.query<TUserInfo, void>({
        query: () => ({
          url: 'users/info',
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),

      changePassword: builder.mutation<{ message: string }, IPasswordData>({
        query: ({ ...body }) => ({
          url: 'users/password',
          method: 'PUT',
          body: { ...body },
        }),
        invalidatesTags: ['Users'],
      }),

      changeUsername: builder.mutation<
        { message: string },
        Pick<IUser, 'username'>
      >({
        query: ({ ...body }) => ({
          url: 'users/username',
          method: 'PUT',
          body: { ...body },
        }),
        invalidatesTags: ['Users'],
      }),

      deleteUser: builder.mutation<void, void>({
        query: () => ({
          url: 'users',
          method: 'DELETE',
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const {
  useCreateUserMutation,
  useGetUserCartQuery,
  useGetUserInfoQuery,
  useChangePasswordMutation,
  useChangeUsernameMutation,
  useDeleteUserMutation,
} = userApi;
