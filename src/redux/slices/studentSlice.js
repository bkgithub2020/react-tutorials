import { createSlice } from "@reduxjs/toolkit";

const getLocalStudentItems = () => {
    let studentItems = localStorage.getItem('students')
    if (studentItems) {
        return JSON.parse(localStorage.getItem('students'))
    } else {
        return []
    }
}

const initialState = {
    studentsList: getLocalStudentItems(),
    studentDetail: {}
}

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        addStudent: (state, { type, payload }) => ({
            studentsList: [...state.studentsList, payload]
        }),
        setStudentDetail: (state, { type, payload }) => ({
            ...state, studentDetail: payload
        }),
        editStudentDetail: (state, { type, payload }) => ({
            state
        }),
        deleteStudent: (state, { type, payload }) => ({
            state
        })

    }
})

export const { addStudent, setStudentDetail } = studentSlice.actions;

export default studentSlice.reducer;