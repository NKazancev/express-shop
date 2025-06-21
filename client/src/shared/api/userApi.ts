import baseApi from '@config/baseApi';
import { IAuthResponse } from '@shared/models/auth';
import {
  ICreateUserData,
  IPasswordData,
  IUser,
  IUserInfo,
} from '@shared/models/user';

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

      getUser: builder.query<IUser, void>({
        query: () => ({
          url: 'users',
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),

      getUserInfo: builder.query<IUserInfo, void>({
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
  useGetUserQuery,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useChangePasswordMutation,
  useChangeUsernameMutation,
} = userApi;
