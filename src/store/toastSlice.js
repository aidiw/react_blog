import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasts: []
}

const toastSlice = createSlice({
    name: 'toast',
    initialState, // state 초기값
    reducers: {
        addToast: (state, action) => { //state는  initialState의 toatsts를 변경하기 위함
            state.toasts.push(action.payload);
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter(toast => {
                return toast.id !== action.payload
            })
        }
    }// state 변경 업데이트함수
});

export const {addToast, removeToast} = toastSlice.actions;

export default toastSlice.reducer;