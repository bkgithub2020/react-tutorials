import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from 'moment';
import hotelData from '../../json-data/hotelData.json';
import RoomDropdown from './RoomDropdown';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarDataThunk } from '../../redux/thunk/calendarThunk';
import { setSelectedRooms } from '../../redux/slices/calendarSlice';

// const calendarEvents = [
//     { title: 'event 1', date: '2022-09-01' },
//     { title: 'event 2', date: '2022-09-02' }
// ];

function Calendar() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { calendarData, rooms, selectedRooms } = useSelector((state) => state.calendarReducer);
    const dispatch = useDispatch();

    const handleDates = (rangeInfo) => {
        setStartDate(rangeInfo.start);
        setEndDate(rangeInfo.end);
    }

    const filterData = () => {
        dispatch(setCalendarDataThunk({ startDate, endDate, selectedRooms }));
    }

    useEffect(() => {
        filterData();
    }, [startDate, endDate, selectedRooms])

    const handleRoomFilter = (event) => {
        dispatch(setSelectedRooms(event.target.value))
    }

    return (
        <>
            <RoomDropdown roomsData={rooms} handleRoomFilterFunc={handleRoomFilter} selectedRoom={selectedRooms} />
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                weekends={true}
                events={calendarData}
                datesSet={handleDates}
            />
        </>

    )
}

export default Calendar;