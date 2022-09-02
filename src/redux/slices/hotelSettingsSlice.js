import { createSlice } from "@reduxjs/toolkit";

const getLocalSettingsItems = () => {
    let settingItems = localStorage.getItem('hotelSettings')
    if (settingItems) {
        return JSON.parse(localStorage.getItem('hotelSettings'))
    } else {
        return {
            dateSetting: {
                "sunday": 0,
                "monday": 0,
                "tuesday": 0,
                "wednesday": 0,
                "thursday": 0,
                "friday": 0,
                "saturday": 0
            }
        }
    }
}

const initialState = {
    hotelSettings: getLocalSettingsItems()
}

export const hotelSettingSlice = createSlice({
    name: "hoteldate",
    initialState,
    reducers: {
        updateHotelDateSettings: (state, { type, payload }) => ({
            hotelSettings: {
                ...state.hotelSettings,
                dateSetting: { ...state.hotelSettings.dateSetting, ...payload }
            }
        })

    }
})

export const { updateHotelDateSettings } = hotelSettingSlice.actions;

export default hotelSettingSlice.reducer;