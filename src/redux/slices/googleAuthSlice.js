import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

export const googleAuthSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setSignedIn: (state, { type, payload }) => ({
            ...state, isLoggedIn: payload
        })
    }
})

export const { setSignedIn } = googleAuthSlice.actions;

export default googleAuthSlice.reducer;