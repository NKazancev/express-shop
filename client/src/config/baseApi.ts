import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from './store';
import { setCredentials, logOut } from '../shared/slices/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status == 403) {
    const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data));
    } else {
      api.dispatch(logOut);
    }
  }
  return result;
};

const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default baseApi;
