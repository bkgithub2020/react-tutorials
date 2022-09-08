import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import RoomDropdown from './RoomDropdown';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarDataThunk } from '../../redux/thunk/calendarThunk';
import { setSelectedRooms } from '../../redux/slices/calendarSlice';
import DialogModal from '../common/DialogModal';
import EventForm from './EventForm';
import EventDetail from './EventDetail';

// const calendarEvents = [
//     { title: 'event 1', date: '2022-09-01' },
//     { title: 'event 2', date: '2022-09-02' }
// ];

function Calendar() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isDetailModal, setIsDetailModal] = useState(false);
    const [eventDetail, setEventDetail] = useState("");
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

    const handleDateClick = (arg) => {
        setEventDate(arg.date)
        setOpenModal(true);
    }

    const handleClickOpen = () => {
        setIsDetailModal(false);
        setOpenModal(true);
    };

    const handleClose = () => {
        setEventDate("")
        setOpenModal(false);
    };

    const handleEventClick = ({ event, el }) => {
        setEventDetail(event);
        setOpenModal(true);
        setIsDetailModal(true);
    };

    const handleDateSelect = (selectInfo) => {

        let calendarApi = selectInfo.view.calendar
        let title = prompt('Please enter a new title for your event')

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({ // will render immediately. will call handleEventAdd
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            }, true) // temporary=true, will get overwritten when reducer gives new events
        }
    }

    const handleEventChange = (changeInfo) => {
        console.log(changeInfo.event.toPlainObject())
    }


    return (
        <>
            <DialogModal visibility={openModal} handleClickOpenFunc={handleClickOpen} handleCloseFunc={handleClose} component={isDetailModal ? <EventDetail data={eventDetail} /> : <EventForm eventDate={eventDate} />} />
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
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventChange={handleEventChange} // called for drag-n-drop/resize
                selectable={true}
                editable={true}
                dayMaxEvents={true} // when too many events in a day, show the popover

            />
        </>

    )
}

export default Calendar;