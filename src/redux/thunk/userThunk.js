import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSignedIn } from '../slices/googleAuthSlice';
import { setAlert } from '../slices/alertSlice';
import axios from 'axios';

export const setLoggedInStatusUser = createAsyncThunk("setLoggedInStatusUser", async (_request, { dispatch }) => {
    try {

        await axios.post(
            'https://fakestoreapi.com/auth/login',
            _request
        )
            .then(function (response) {
                dispatch(setAlert({
                    messageStatus: true,
                    messageText: "Logged in Successfully",
                    errorStatus: false
                }));
                dispatch(setSignedIn({ status: true, token: response.data.token, isGoogleLogin: false }));
                let tokenId = response.data.token;
                localStorage.setItem(
                    'authToken',
                    tokenId
                );
                localStorage.setItem(
                    'isGoogleLogin',
                    false
                );

            })
            .catch(function (error) {
                dispatch(setAlert({
                    messageStatus: true,
                    messageText: error.response.data,
                    errorStatus: true
                }))
                dispatch(setSignedIn({ status: false, token: "", isGoogleLogin: false }));

                localStorage.removeItem('authToken');
                localStorage.removeItem('isGoogleLogin');
            });


    } catch (error) {
        console.log(error)
    }
});