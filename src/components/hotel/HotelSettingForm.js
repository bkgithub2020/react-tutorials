import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AlertSuccess from '../common/AlertSuccess';
import Button from '@mui/material/Button';
import Validations from '../../helper/validation';
import { updateHotelDateSettings } from '../../redux/slices/hotelSettingsSlice';


const WeekDays = [
    { id: 1, name: "sunday", sortName: "Sun" },
    { id: 2, name: "monday", sortName: "Mon" },
    { id: 3, name: "tuesday", sortName: "Tue" },
    { id: 4, name: "wednesday", sortName: "Wed" },
    { id: 5, name: "thursday", sortName: "Thu" },
    { id: 6, name: "friday", sortName: "Fri" },
    { id: 7, name: "saturday", sortName: "Sat" }
];

function HotelSettingForm() {
    const [formState, setFormState] = useState({
        values: {}
    });
    const [message, setMessage] = useState("");
    const [openState, setOpenState] = useState(false);
    const [errors, setErrors] = useState({});
    const hotelDateSettingDataFromStore = useSelector((state) => state.hotelSettingReducer.hotelSettings);

    // Update data in Local Storage after update data
    useEffect(() => {
        localStorage.setItem('hotelSettings', JSON.stringify({ ...hotelDateSettingDataFromStore, dateSetting: { ...hotelDateSettingDataFromStore.dateSetting } }));
        setFormState({
            values: {
                ...hotelDateSettingDataFromStore.dateSetting
            }
        })
    }, [hotelDateSettingDataFromStore]);
    // 

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
        const error = Validations.validateHoteldatSetting(formState.values);
        setErrors(error);

        if (!Object.keys(error).length) {
            dispatch(updateHotelDateSettings(formState.values)); //After Redux
            setFormState({ values: {} });
            setOpenState(true);
            setMessage("Setting Updated Successfully!");
        }


    }

    const handleClose = (event, reason) => {
        setOpenState(false);
    };

    const getFormFields = () => {
        const formFields = [];

        WeekDays.forEach((item) => {

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
                        InputProps={{
                            inputProps: { min: 0 }
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
                            Settings
                        </Typography>
                        <form className="" onSubmit={handleSubmit} id="hotelSettingForm" autoComplete='off' name="hotelSettingForm">
                            <Grid container spacing={3} mb={20}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="body2" gutterBottom>
                                        Enter Amount For Each Day of Week
                                    </Typography>
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

export default HotelSettingForm;