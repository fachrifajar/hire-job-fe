import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  profile: null,
  isRecruiter: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.token = action.payload;
    },
    setAuthProfile(state, action) {
      state.profile = action.payload;
    },
    setAuthIsRecruiter(state, action) {
      state.isRecruiter = action.payload;
    },
    deleteAuthData(state) {
      state.token = null;
      state.profile = null;
      state.isRecruiter = null;
    },
  },
});

export const {
  setAuthToken,
  setAuthProfile,
  setAuthIsRecruiter,
  deleteAuthData,
} = authSlice.actions;
export default authSlice.reducer;
