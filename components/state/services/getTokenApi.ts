import { baseApi as api } from './baseApi';

export interface EmailToken {
  token: string;
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiServicesAppEmailToken: build.mutation<EmailToken, { email: string }>({
      query: (queryArg) => ({
        url: '/token',
        method: 'POST',
        body: { email: queryArg.email },
      }),
    }),
  }),
});

export const { useApiServicesAppEmailTokenMutation } = injectedRtkApi;
