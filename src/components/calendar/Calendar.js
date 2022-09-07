import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from 'moment';
import hotelData from '../../json-data/hotelData.json';

// const calendarEvents = [
//     { title: 'event 1', date: '2022-09-01' },
//     { title: 'event 2', date: '2022-09-02' }
// ];

function Calendar() {
    const [calendarEvents, setCalendarEvents] = useState([]);

    const handleDates = (rangeInfo) => {
        let calendarData = [];
        const calendarEventsData = [];
        const object = hotelData.prices.data;
        for (const property in object) {
            if (property >= moment(rangeInfo.start).format('YYYY-MM-DD')
                && property < moment(rangeInfo.end).format('YYYY-MM-DD')) {
                calendarData.push(object[property]);
                let item = object[property];
                for (const pInner in item) {
                    if (!item[pInner].error && item[pInner].price) {
                        calendarEventsData.push({ title: `Room #${pInner} rate $${item[pInner].price}`, date: property })
                    }
                }

            }
        }

        setCalendarEvents(calendarEventsData);//SET CALENDAR DATA
    }

    return (
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
    )
}

export default Calendar;