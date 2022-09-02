import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AlertSuccess from '../common/AlertSuccess';
import Button from '@mui/material/Button';
import Validations from '../../helper/validation';
import { setHotelRate } from "../../redux/thunk/hotelRate";


const Rooms = [
    { id: 1, name: "room1", sortName: "Room 1" },
    { id: 2, name: "room2", sortName: "Room 2" },
    { id: 3, name: "room3", sortName: "Room 3" }
];

function HotelRoomPriceForm() {
    const [startDateValue, setStartDateValue] = useState('');
    const [endDateValue, setEndDateValue] = useState('');
    const [formState, setFormState] = useState({
        values: {}
    });
    const [message, setMessage] = useState("");
    const [openState, setOpenState] = useState(false);
    const [errors, setErrors] = useState({});
    const hotelDateSetting = useSelector((state) => state.hotelSettingReducer.hotelSettings.dateSetting);
    const hotelDates = useSelector((state) => state.hotelDateReducer.hotelDateList);

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

        setErrors({
            ...errors,
            [event.target.name]: ""
        })
    }

    const handleChangeDate = (newValue) => {
        setStartDateValue(newValue);
        let startDate = moment(newValue.$d).format('MM/DD/YYYY');
        setDateUpdated('start_date', startDate);
    };

    const handleEndDate = (newValue) => {
        setEndDateValue(newValue);
        let endDate = moment(newValue.$d).format('MM/DD/YYYY');
        setDateUpdated('end_date', endDate);
    };

    const setDateUpdated = (dateName, updatedValue) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [dateName]: updatedValue
            }
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = Validations.validateHotelRoomPriceForm(formState.values);
        setErrors(error);

        if (!Object.keys(error).length) {

            let startDate = moment(formState.values.start_date);
            let endDate = moment(formState.values.end_date);

            // If you want an inclusive end date (fully-closed interval)
            for (var m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
                let date = m.format('MM-DD-YYYY');
                let dayName = (moment(m).format('dddd')).toLowerCase();
                let amtPercentage = hotelDateSetting[dayName];
                let requestData = {};

                requestData[date] = {
                    room1: parseFloat(formState.values.room1) + ((parseFloat(formState.values.room1) * parseFloat((amtPercentage)) / 100)),
                    room2: parseFloat(formState.values.room2) + ((parseFloat(formState.values.room2) * parseFloat((amtPercentage)) / 100)),
                    room3: parseFloat(formState.values.room3) + ((parseFloat(formState.values.room3) * parseFloat((amtPercentage)) / 100))
                };

                dispatch(setHotelRate(requestData)); //After Redux                
            }

            console.log("hotelDates", hotelDates)
            // localStorage.setItem(
            //     'hotelDates',
            //     JSON.stringify(
            //         {
            //             ...hotelDates
            //         }
            //     ));

            setFormState({ values: {} });
            setDateUpdated('start_date', '');
            setDateUpdated('end_date', '');
            setOpenState(true);
            setMessage("Price added Successfully!");
        }


    }

    const handleClose = (event, reason) => {
        setOpenState(false);
    };

    const getFormFields = () => {
        const formFields = [];

        Rooms.forEach((item) => {

            formFields.push(
                <Grid item xs={12} sm={12} key={item.id}>
                    <TextField
                        id={item.name}
                        name={item.name}
                        label={item.sortName + "*"}
                        type="number"
                        fullWidth
                        variant="standard"
                        error={errors && errors[item.name] ? true : false}
                        helperText={errors && errors[item.name]}
                        onChange={handleChange}
                        value={formState.values[item.name] || ''}
                        inputProps={{
                            maxLength: 13,
                            step: "1"
                        }}
                    />
                </Grid>
            );
        })
        return formFields;

    }



    return (
        <>
            <Box>
                <AlertSuccess open={openState} message={message} handleClose={handleClose} />
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <Grid item xs={6}>
                        <Typography variant="h4" gutterBottom>
                            Add Price
                        </Typography>
                        <form className="" onSubmit={handleSubmit} id="roomPriceForm" autoComplete='off' name="roomPriceForm">
                            <Grid container spacing={3} mb={20}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="body2" gutterBottom>
                                        Enter Amount For Each Room
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Start Date"
                                            name="start_date"
                                            inputFormat="MM/DD/YYYY"
                                            value={startDateValue}
                                            onChange={handleChangeDate}
                                            renderInput={(params) => <TextField
                                                {...params}
                                                variant="standard"
                                                error={errors && errors.start_date ? true : false}
                                                helperText={errors && errors.start_date}
                                            />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="End Date"
                                            name="end_date"
                                            inputFormat="MM/DD/YYYY"
                                            value={endDateValue}
                                            onChange={handleEndDate}
                                            renderInput={(params) => <TextField
                                                {...params}
                                                variant="standard"
                                                error={errors && errors.end_date ? true : false}
                                                helperText={errors && errors.start_date}
                                            />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                {
                                    getFormFields()
                                }
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

export default HotelRoomPriceForm;