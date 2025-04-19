import baseApi from '@config/baseApi';
import { IAuthResponse } from '@shared/models/auth';
import { ICreateUserData } from '@shared/models/user';

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
      }),
    }),
  });

export const { useCreateUserMutation } = userApi;
