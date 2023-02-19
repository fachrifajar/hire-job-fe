import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  slug: null,
};

export const dataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
