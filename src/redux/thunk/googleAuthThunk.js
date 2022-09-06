import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSignedIn } from '../slices/googleAuthSlice';

export const setLoggedInStatus = createAsyncThunk("setLoggedInStatus", async (_request, { dispatch }) => {
    try {
        dispatch(setSignedIn(_request));

        if (_request.status) {
            localStorage.setItem(
                'authTokenGoogle',
                _request.tokenId
            );
        } else {
            localStorage.removeItem('authTokenGoogle');
        }


    } catch (error) {
        console.log(error)
    }
});