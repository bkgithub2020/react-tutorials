import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';
import ParentDetails from './ParentDetails';
import Button from '@mui/material/Button';
import AlertSuccess from '../common/AlertSuccess';

export default function StudentForm({ setStudentsFunc, studentData }) {
    const [submitted, setSubmitted] = useState(false);
    const [formState, setFormState] = useState({
        values: {}
    });
    const [message, setMessage] = useState("");
    const [openState, setOpenState] = useState(false);

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
        setSubmitted(true);
        e.preventDefault();

        const { firstName, lastName, gender, address1, city, state, zip, country } = formState.values;

        if (firstName && lastName && gender && address1 && city && state && zip && country) {
            setStudentsFunc([...studentData, formState.values]);
            setFormState({ values: {} });
            setSubmitted(false);
            setOpenState(true);
            setMessage("Student Added Successfully!")
        }
    }

    const handleClose = (event, reason) => {
        setOpenState(false);
    };

    return (
        <Box>
            <AlertSuccess open={openState} message={message} handleClose={handleClose} />
            <Grid container spacing={2} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom>
                        Student Form
                    </Typography>
                    <form className="" onSubmit={handleSubmit} id="studentForm" autoComplete='off' name="studentForm">
                        <Grid container spacing={3} mb={20}>
                            <PersonalDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                            />
                            <AddressDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                            />
                            <ParentDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                            />
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
    );
}