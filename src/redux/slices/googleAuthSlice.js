import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem('authToken');

if (typeof token === undefined) {
    token = "";
}

const getTokenFromLocal = () => {
    if (token) {
        return true;
    } else {
        return false;
    }
}

const initialState = {
    isLoggedIn: getTokenFromLocal(),
    token,
    isGoogleLogin: false
}

export const googleAuthSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setSignedIn: (state, { payload }) => ({
            ...state, isLoggedIn: payload.status
        })
    }
})

export const { setSignedIn } = googleAuthSlice.actions;

export default googleAuthSlice.reducer;