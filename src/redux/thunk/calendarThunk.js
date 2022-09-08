import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from 'moment';
import hotelData from '../../json-data/hotelData.json';
import { resetCalendarData, setRooms, setRoomItem } from '../slices/calendarSlice';

export const setCalendarDataThunk = createAsyncThunk("setCalendarDataThunk", async (_request, { dispatch }) => {
    try {

        const { startDate, endDate, selectedRooms } = _request;

        dispatch(resetCalendarData());//Reset Calendar Data when Request New

        const object = hotelData.prices.data;
        // convert object to key's array
        const objectKeys = Object.keys(object);

        // iterate over object
        objectKeys.forEach((key, index) => {
            if (key >= moment(startDate).format('YYYY-MM-DD')
                && key < moment(endDate).format('YYYY-MM-DD')
            ) {
                let item = object[key];
                // convert object to key's array
                const itemObjKeys = (selectedRooms && (selectedRooms.length > 0)) ? [selectedRooms] : Object.keys(object[key]);
                dispatch(setRoomData({ itemObjKeys, item, key, filterStatus: (selectedRooms && (selectedRooms.length > 0)) ? true : false }));
            }
        });


    } catch (error) {
        console.log(error)
    }
});

export const setRoomData = createAsyncThunk("setRoomData", async (_request, { dispatch }) => {

    try {

        const { itemObjKeys, item, key, filterStatus } = _request

        const roomData = [];
        // iterate over inner object
        itemObjKeys.forEach((objKey, objIndex) => {
            if (objKey !== 'property' && !filterStatus) {
                roomData.push(objKey)
            }

            if (!item[objKey].error && item[objKey].price) {
                dispatch(setRoomItem({ title: `Room #${objKey} rate $${item[objKey].price}`, date: key }));//SET CALENDAR DATA
            }
        });

        if (!filterStatus) {
            dispatch(setRooms([...new Set(roomData)]));
        }


    } catch (error) {
        console.log(error)
    }
});