import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer, changeCurrentUser } from "./slices/AuthSlice";
import { reducer as reduxForm } from "redux-form";
import { userApi } from "./apis/userApi";
import { surveyApi } from "./apis/surveyApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: reduxForm,
    [userApi.reducerPath]: userApi.reducer,
    [surveyApi.reducerPath]: surveyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(surveyApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchUserQuery, useHandleTokenMutation } from "./apis/userApi";
export { useSaveSurveyMutation, useFetchSurveysQuery } from "./apis/surveyApi";
export { changeCurrentUser };
