import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from './baseQuery';

const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Users', 'Cart'],
});

export default baseApi;
