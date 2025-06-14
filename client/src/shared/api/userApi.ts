import baseApi from '@config/baseApi';
import { IAuthResponse } from '@shared/models/auth';
import { ICreateUserData, IPasswordData, IUser } from '@shared/models/user';

const userApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Users'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createUser: builder.mutation<IAuthResponse, ICreateUserData>({
        query: (data) => ({
          url: 'users/registration',
          method: 'POST',
          body: { ...data },
        }),
        invalidatesTags: ['Users'],
      }),

      getUserInfo: builder.query<IUser, void>({
        query: () => ({
          url: 'users/info',
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),

      changePassword: builder.mutation<IUser, IPasswordData>({
        query: ({ ...body }) => ({
          url: 'users/password',
          method: 'PUT',
          body: { ...body },
        }),
        invalidatesTags: ['Users'],
      }),

      changeUsername: builder.mutation<IUser, Pick<IUser, 'username'>>({
        query: ({ ...body }) => ({
          url: 'users/username',
          method: 'PUT',
          body: { ...body },
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const {
  useCreateUserMutation,
  useGetUserInfoQuery,
  useChangePasswordMutation,
  useChangeUsernameMutation,
} = userApi;
