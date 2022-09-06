import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteStudent } from '../../redux/slices/studentSlice';
import store from '../store';

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