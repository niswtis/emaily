import { createSlice } from "@reduxjs/toolkit";

const surveySlice = createSlice({
  name: "survey",
  initialState: {
    data: [],
  },
});

export const surveyReducer = surveySlice.reducer;
