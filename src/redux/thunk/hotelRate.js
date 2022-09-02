import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import { addHotelDates } from '../slices/hotelDateSlice';
import store from '../store';

export const setHotelRate = createAsyncThunk("setHotelRate", async (_request, { dispatch }) => {
    try {
        let hotelDatelist = store.getState().hotelDateReducer.hotelDateList;
        dispatch(addHotelDates(_request));

        // Set data in local storage
        localStorage.setItem(
            'hotelDates',
            JSON.stringify(
                {
                    ...hotelDatelist,
                    ..._request
                }
            ));

    } catch (error) {
        console.log(error)
    }
});