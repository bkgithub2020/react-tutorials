import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSignedIn } from '../slices/googleAuthSlice';

export const setLoggedInStatus = createAsyncThunk("setLoggedInStatus", async (_request, { dispatch }) => {
    try {
        _request.isGoogleLogin = true;
        _request.token = _request.tokenId;

        dispatch(setSignedIn(_request));

        if (_request.status) {
            localStorage.setItem(
                'authToken',
                _request.tokenId
            );
            localStorage.setItem(
                'isGoogleLogin',
                true
            );
        } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('isGoogleLogin');
        }


    } catch (error) {
        console.log(error)
    }
});