import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSignedIn } from '../slices/googleAuthSlice';

export const setLoggedInStatus = createAsyncThunk("setLoggedInStatus", async (_request, { dispatch }) => {
    try {
        dispatch(setSignedIn(_request))
    } catch (error) {
        console.log(error)
    }
});