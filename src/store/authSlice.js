import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState, // state 초기값
    reducers: {
      login: (state) => {
        state.isLoggedIn = true;
      },
      logout: (state) => {
        state.isLoggedIn = false;
      }
    }// state 변경 업데이트함수
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;