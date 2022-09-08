import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AlertSuccess from '../common/AlertSuccess';
import Button from '@mui/material/Button';
import Validations from '../../helper/validation';
import moment from 'moment';
import { addCalendarEvent } from '../../redux/slices/calendarSlice';

function EventForm({ eventDate, handleCloseFunc }) {

    const [formState, setFormState] = useState({
        values: {}
    });
    const [message, setMessage] = useState("");
    const [openState, setOpenState] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            }

        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = Validations.validateEventForm(formState.values);
        setErrors(error);

        if (!Object.keys(error).length) {
            const { event_title } = formState.values;
            dispatch(addCalendarEvent({ title: event_title, date: moment(eventDate).format('YYYY-MM-DD') }));
            setFormState({ values: {} });
            setOpenState(true);
            setMessage("Event Added Successfully!");
            handleCloseFunc();

        }


    }

    const handleClose = (event, reason) => {
        setOpenState(false);
    };

    return (
        <>
            <Box>
                <AlertSuccess open={openState} message={message} handleClose={handleClose} />
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <Grid item xs={12}>
                        <form className="" onSubmit={handleSubmit} id="eventForm" autoComplete='off' name="eventForm">
                            <Grid container spacing={3} mb={20}>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="event_date"
                                        name="event_date"
                                        label="Event Date"
                                        disabled
                                        fullWidth
                                        variant="standard"
                                        error={errors && errors['event_date'] ? true : false}
                                        helperText={errors && errors['event_date']}
                                        onChange={handleChange}
                                        value={formState.values['event_date'] || moment(eventDate).format('MM/DD/YYYY')}
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="event_title"
                                        name="event_title"
                                        label="Event Title"
                                        fullWidth
                                        variant="standard"
                                        error={errors && errors['event_title'] ? true : false}
                                        helperText={errors && errors['event_title']}
                                        onChange={handleChange}
                                        value={formState.values['event_title'] || ''}
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default EventForm;