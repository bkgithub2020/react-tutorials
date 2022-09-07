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
        const calendarEventsData = [];
        const object = hotelData.prices.data;

        // convert object to key's array
        const objectKeys = Object.keys(object);

        // iterate over object
        objectKeys.forEach((key, index) => {
            if (key >= moment(rangeInfo.start).format('YYYY-MM-DD')
                && key < moment(rangeInfo.end).format('YYYY-MM-DD')
            ) {
                let item = object[key];
                // convert object to key's array
                const itemObjKeys = Object.keys(object[key]);

                // iterate over inner object
                itemObjKeys.forEach((objKey, objIndex) => {
                    if (!item[objKey].error && item[objKey].price) {
                        calendarEventsData.push({ title: `Room #${objKey} rate $${item[objKey].price}`, date: key })
                    }
                });

            }
        });

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