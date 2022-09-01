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
    studentsList: getLocalStudentItems()
}

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        addStudent: (state, { type, payload }) => ({
            studentsList: [...state.studentsList, payload]
        })

    }
})

export const { addStudent } = studentSlice.actions;

export default studentSlice.reducer;