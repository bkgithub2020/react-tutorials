import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocal = () => {
    let token = localStorage.getItem('authToken')
    if (token) {
        return true;
    } else {
        return false;
    }
}

const initialState = {
    isLoggedIn: getTokenFromLocal()
}

export const userAuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSignedIn: (state, { payload }) => ({
            ...state, isLoggedIn: payload.status
        })
    }
})

export const { setSignedIn } = userAuthSlice.actions;

export default userAuthSlice.reducer;