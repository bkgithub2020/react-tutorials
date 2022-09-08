import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    calendarData: [],
    rooms: [],
    selectedRooms: []
}

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        resetCalendarData: (state, { type, payload }) => ({
            ...state, calendarData: []
        }),
        setRooms: (state, { type, payload }) => ({
            ...state, rooms: payload
        }),
        setSelectedRooms: (state, { type, payload }) => ({
            ...state, selectedRooms: [payload]
        }),
        setRoomItem: (state, { type, payload }) => ({
            ...state, calendarData: [...state.calendarData, payload]
        })
    }
})

export const { resetCalendarData, setRooms, setSelectedRooms, setRoomItem } = calendarSlice.actions;

export default calendarSlice.reducer;