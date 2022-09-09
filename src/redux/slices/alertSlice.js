import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageStatus: false,
    messageText: "",
    errorStatus: false
}

export const alertMessageSlice = createSlice({
    name: "alert_message",
    initialState,
    reducers: {
        setAlert: (state, { payload }) => ({
            ...state, ...payload
        })
    }
})

export const { setAlert } = alertMessageSlice.actions;

export default alertMessageSlice.reducer;