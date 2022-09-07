import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from 'moment';
import hotelData from '../../json-data/hotelData.json';
import RoomDropdown from './RoomDropdown';
import { useEffect } from 'react';

// const calendarEvents = [
//     { title: 'event 1', date: '2022-09-01' },
//     { title: 'event 2', date: '2022-09-02' }
// ];

function Calendar() {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    let calendarEventsData = [];

    const handleDates = (rangeInfo) => {
        setStartDate(rangeInfo.start);
        setEndDate(rangeInfo.end);
    }

    const filterData = () => {
        const object = hotelData.prices.data;
        calendarEventsData = [];//Reset

        // convert object to key's array
        const objectKeys = Object.keys(object);

        // iterate over object
        objectKeys.forEach((key, index) => {
            if (key >= moment(startDate).format('YYYY-MM-DD')
                && key < moment(endDate).format('YYYY-MM-DD')
            ) {
                let item = object[key];
                // convert object to key's array
                const itemObjKeys = (room && (room.length > 0)) ? [room] : Object.keys(object[key]);
                setRoomData(itemObjKeys, item, key, (room && (room.length > 0)) ? true : false);
            }
        });



    }

    const setRoomData = (itemObjKeys, item, key, filterStatus) => {
        const roomData = [];
        // iterate over inner object
        itemObjKeys.forEach((objKey, objIndex) => {
            if (objKey !== 'property' && !filterStatus) {
                roomData.push(objKey)
            }

            if (!item[objKey].error && item[objKey].price) {
                calendarEventsData.push({ title: `Room #${objKey} rate $${item[objKey].price}`, date: key })
            }
        });

        if (!filterStatus) {
            setRooms([...new Set(roomData)]);
        }

        setCalendarEvents(calendarEventsData);//SET CALENDAR DATA
    }

    useEffect(() => {
        filterData();
    }, [startDate, endDate, room])

    const handleRoomFilter = (event) => {
        setRoom(event.target.value);
    }

    return (
        <>
            <RoomDropdown roomsData={rooms} handleRoomFilterFunc={handleRoomFilter} selectedRoom={room} />
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                weekends={true}
                events={calendarEvents}
                datesSet={handleDates}
            />
        </>

    )
}

export default Calendar;