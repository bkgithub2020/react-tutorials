import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSignedIn } from '../slices/googleAuthSlice';
import { setAlert } from '../slices/alertSlice';
import { addUser, updateUser, deleteUser, setUsersList } from '../../redux/slices/userSlice';
import axios from 'axios';
import store from '../store';

export const addUserThunk = createAsyncThunk("addUserThunk", async (_request, { dispatch }) => {

    try {

        let studentList = store.getState().student.studentsList;

        // Set data in local storage
        localStorage.setItem(
            'students',
            JSON.stringify(
                [...studentList, _request]
            ));

        dispatch(addUser(_request)); //After Redux

    } catch (error) {
        console.log(error)
    }
});

export const updateUserThunk = createAsyncThunk("updateUserThunk", async (_request, { dispatch }) => {

    try {

        const { id, email, username, password, firstname, lastname, city, street, number, zipcode, lat, long, phone } = _request;

        // Make a request for a user with a given ID
        await axios.put(`https://fakestoreapi.com/users/${id}`,
            {
                email,
                username,
                password,
                name: {
                    firstname,
                    lastname
                },
                address: {
                    city,
                    street,
                    number,
                    zipcode,
                    geolocation: {
                        lat,
                        long
                    }
                },
                phone
            })
            .then(function (response) {
                // handle success

                dispatch(updateUser(response.data)); //After Redux

                let userList = store.getState().student.studentsList;
                const newtList = userList.map(usr =>
                    usr.id === _request.id
                        ? { ..._request }
                        : usr
                )

                // Set data in local storage
                localStorage.setItem(
                    'users',
                    JSON.stringify(
                        newtList
                    ));

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })


    } catch (error) {
        console.log(error)
    }
});

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

export const getUsersThunk = createAsyncThunk("getUsersThunk", async (_request, { dispatch }) => {

    try {

        // Make a request for a user with a given ID
        await axios.get('https://fakestoreapi.com/users')
            .then(function (response) {
                // handle success

                dispatch(setUsersList(response.data))

                // Set data in local storage
                localStorage.setItem(
                    'users',
                    JSON.stringify(
                        response.data
                    ));

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })


    } catch (error) {
        console.log(error)
    }
});

export const deleteUserThunk = createAsyncThunk("deleteUserThunk", async (_request, { dispatch }) => {

    try {

        dispatch(deleteUser(_request));

        let userList = store.getState().userReducer.studentsList;
        const newUserList = userList.filter(usr => usr.id !== _request.id)

        // Set data in local storage
        localStorage.setItem(
            'users',
            JSON.stringify(
                newUserList
            ));

    } catch (error) {
        console.log(error)
    }
});