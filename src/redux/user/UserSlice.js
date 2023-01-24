import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: sessionStorage.getItem("user") ? true : false,
  userInfo: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : {},
  error: {},
  response: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      state.error = {};
      state.isLoggedIn = true;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },

    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },

    logoutSuccess: (state, action) => {
      state.userInfo = {};
      state.error = {};
      state.isLoading = false;
      state.isLoggedIn = false;
      sessionStorage.removeItem("user");
    },

    requestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
const { reducer, actions } = userSlice;
export const {
  requestFailed,
  requestPending,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} = actions;
export default reducer;
