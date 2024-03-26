import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_API_SERVICE_BASE_URL,
    prepareHeaders(headers) {
      const accessToken = Cookies.get('loggedin');
      if (accessToken) {
        headers.set('token', `${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
