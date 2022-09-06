import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocal = () => {
    let token = localStorage.getItem('authTokenGoogle')
    if (token) {
        return true;
    } else {
        return false;
    }
}

const initialState = {
    isLoggedIn: getTokenFromLocal()
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