import { createSlice } from "@reduxjs/toolkit";

const getLocalUserItems = () => {
    let userItems = localStorage.getItem('users')
    if (userItems) {
        return JSON.parse(localStorage.getItem('users'))
    } else {
        return []
    }
}

const getTokenFromLocal = () => {
    let token = localStorage.getItem('authToken')
    if (token) {
        return true;
    } else {
        return false;
    }
}

const initialState = {
    isLoggedIn: getTokenFromLocal(),
    usersList: getLocalUserItems(),
    userDetail: {}
}

export const userAuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsersList: (state, { payload }) => ({
            ...state, usersList: payload
        }),
        setSignedIn: (state, { payload }) => ({
            ...state, isLoggedIn: payload.status
        }),
        addUser: (state, { type, payload }) => ({
            usersList: [...state.usersList, payload]
        }),
        setUserDetail: (state, { type, payload }) => ({
            ...state, userDetail: payload
        }),
        updateUser: (state, { type, payload }) => ({
            ...state,
            userDetail: payload,
            usersList: state.usersList.map(p =>
                p.id === payload.id
                    ? { ...payload }
                    : p
            )
        }),
        deleteUser: (state, { payload }) => ({
            ...state,
            userDetail: payload,
            usersList: state.usersList.filter(std => std.id !== payload.id)
        })
    }
})

export const { setSignedIn, addUser, setUsersList, setUserDetail, updateUser, deleteUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;