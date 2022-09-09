import { createAsyncThunk } from "@reduxjs/toolkit";
import { addStudent, updateStudent, deleteStudent } from '../../redux/slices/studentSlice';
import store from '../store';

export const addStudentThunk = createAsyncThunk("addStudentThunk", async (_request, { dispatch }) => {

    try {

        let studentList = store.getState().student.studentsList;

        // Set data in local storage
        localStorage.setItem(
            'students',
            JSON.stringify(
                [...studentList, _request]
            ));

        dispatch(addStudent(_request)); //After Redux

    } catch (error) {
        console.log(error)
    }
});

export const updateStudentThunk = createAsyncThunk("updateStudentThunk", async (_request, { dispatch }) => {

    try {

        dispatch(updateStudent(_request)); //After Redux

        let studentList = store.getState().student.studentsList;
        const newStudentList = studentList.map(std =>
            std.id === _request.id
                ? { ..._request }
                : std
        )

        // Set data in local storage
        localStorage.setItem(
            'students',
            JSON.stringify(
                newStudentList
            ));

    } catch (error) {
        console.log(error)
    }
});


export const deleteStudentThunk = createAsyncThunk("deleteStudentThunk", async (_request, { dispatch }) => {

    try {

        dispatch(deleteStudent(_request));

        let studentList = store.getState().student.studentsList;
        const newStudentList = studentList.filter(std => std.id !== _request.id)

        // Set data in local storage
        localStorage.setItem(
            'students',
            JSON.stringify(
                newStudentList
            ));

    } catch (error) {
        console.log(error)
    }
});