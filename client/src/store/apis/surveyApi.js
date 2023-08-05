import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const surveyApi = createApi({
  reducerPath: "survey",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.DOMAIN,
  }),
  endpoints(builder) {
    return {
      fetchSurveys: builder.query({
        providesTags: () => {
          return [{ type: "survey" }];
        },
        query: () => {
          return {
            url: "/api/surveys",
            method: "GET",
          };
        },
      }),
      saveSurvey: builder.mutation({
        // find a way to invalidate the user tag from userApi.js
        invalidatesTags: () => {
          return [{ type: "survey" }];
        },
        query: (surveyData) => {
          return {
            url: `/api/surveys`,
            method: "POST",
            body: surveyData,
          };
        },
      }),
    };
  },
});

export const { useSaveSurveyMutation, useFetchSurveysQuery } = surveyApi;
export { surveyApi };
