import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer, changeCurrentUser } from "../slices/AuthSlice";
import { surveyReducer } from "../slices/SurveySlice";
import { userApi } from "./apis/userApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    survey: surveyReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchUserQuery, useHandleTokenMutation } from "./apis/userApi";
export { changeCurrentUser };
