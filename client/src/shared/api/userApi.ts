import baseApi from '../../config/baseApi';

const userApi = baseApi.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: 'users/registration',
        method: 'POST',
        body: { ...data },
      }),
    }),
    login: builder.mutation({
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
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = userApi;
