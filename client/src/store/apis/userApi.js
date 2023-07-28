import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query({
        providesTags: () => {
          return [{ type: "user" }];
        },
        query: () => {
          return {
            url: "/api/current_user",
            method: "GET",
          };
        },
      }),
      handleToken: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "user" }];
        },
        query: (token) => {
          return {
            url: `/api/stripe`,
            method: "POST",
            body: token,
          };
        },
      }),
    };
  },
});

export const { useFetchUserQuery, useHandleTokenMutation } = userApi;
export { userApi };
