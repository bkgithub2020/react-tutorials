import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';
import ParentDetails from './ParentDetails';
import Button from '@mui/material/Button';
import AlertMessage from '../common/AlertMessage';
// import { addStudent } from '../../redux/actions/StudentActions';
import { addStudentThunk, updateStudentThunk } from '../../redux/thunk/studentThunk';
import short from 'short-uuid';

export default function StudentForm({ setStudentsFunc, isEditFormMode = 0, handleCloseDialogFunc }) {
    const studentData = useSelector((state) => state.student.studentDetail);
    const [submitted, setSubmitted] = useState(false);
    const [formState, setFormState] = useState({
        values: {}
    });
    const [message, setMessage] = useState("");
    const [openState, setOpenState] = useState(false);
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
        setSubmitted(true);
        e.preventDefault();

        const { firstName, lastName, gender, address1, city, state, zip, country } = formState.values;

        if (firstName && lastName && gender && address1 && city && state && zip && country) {
            if (isEditFormMode) {
                dispatch(updateStudentThunk(formState.values)); //After Redux
                setFormState({ values: {} });
                setSubmitted(false);
                setOpenState(true);
                setMessage("Student Updated Successfully!");
                handleCloseDialogFunc(false);

            } else {
                const uniqueID = short.generate();
                formState.values.id = uniqueID;
                dispatch(addStudentThunk(formState.values)); //After Redux
                setFormState({ values: {} });
                setSubmitted(false);
                setOpenState(true);
                setMessage("Student Added Successfully!");
            }

        }
    }

    const handleClose = (event, reason) => {
        setOpenState(false);
    };

    useEffect(() => {
        if (isEditFormMode) {
            setFormState({ values: studentData });
        }
    }, [])

    return (
        <Box>
            <AlertMessage open={openState} message={message} handleClose={handleClose} />
            <Grid container spacing={2} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Grid item xs={12}>
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
                                    {isEditFormMode ? "Update" : "Save"}
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box >
    );
}