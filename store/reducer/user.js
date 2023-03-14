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
    deleteData(state) {
      state.data = null;
      state.slug = null;
    },
  },
});

export const { setData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
