import { baseApi as api } from './baseApi';

type Question = {
  question: string;
  options: string[];
};
export type ApiServicesAppDeleteQuestionDeleteApiArg = {
  id?: string;
};
type Questionnaire = {
  [key: string]: Question;
};
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiServicesAppQuestionGet: build.query<Questionnaire, unknown>({
      query: () => ({
        url: '/questions',
        method: 'GET',
      }),
    }),
    apiServicesAppQuestionPost: build.mutation<Questionnaire, { createQuiz: Question }>({
      query: (arg) => ({
        url: '/questions',
        method: 'POST',
        body: arg.createQuiz,
      }),
    }),
    apiServicesAppQuestionDelete: build.mutation<unknown, ApiServicesAppDeleteQuestionDeleteApiArg>(
      {
        query: (arg) => ({
          url: `/questions/${arg.id}`,
          method: 'DELETE',
        }),
      }
    ),
    apiServicesAppQuestionEdit: build.mutation<unknown, { editQuiz: Question; id: string }>({
      query: (arg) => ({
        url: `/questions/${arg.id}`,
        method: 'PUT',
        body: arg.editQuiz,
      }),
    }),
  }),
});

export const {
  useApiServicesAppQuestionGetQuery,
  useApiServicesAppQuestionPostMutation,
  useApiServicesAppQuestionDeleteMutation,
  useApiServicesAppQuestionEditMutation,
} = injectedRtkApi;
