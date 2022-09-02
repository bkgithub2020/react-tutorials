import { createSlice } from "@reduxjs/toolkit";

const getLocalDateItems = () => {
    let dateItems = localStorage.getItem('hotelDates')
    if (dateItems) {
        return JSON.parse(localStorage.getItem('hotelDates'))
    } else {
        return {}
    }
}

const initialState = {
    hotelDateList: getLocalDateItems()
}

export const hotelDateSlice = createSlice({
    name: "hoteldate",
    initialState,
    reducers: {
        addHotelDates: (state, { type, payload }) => ({
            hotelDateList: { ...state.hotelDateList, ...payload }
        })

    }
})

export const { addHotelDates } = hotelDateSlice.actions;

export default hotelDateSlice.reducer;