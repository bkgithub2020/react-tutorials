import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addUserThunk, updateUserThunk } from '../../redux/thunk/userThunk';
import TextField from '@mui/material/TextField';
import Validations from '../../helper/validation';

export default function UserForm({ setStudentsFunc, isEditFormMode = 0, handleCloseDialogFunc }) {
    const { name: { firstname, lastname }, address: { city, street, number, zipcode, geolocation: { lat, long } }, username, password, phone, email, id } = useSelector((state) => state.userReducer.userDetail);

    const [formState, setFormState] = useState({
        values: {}
    });
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

        const error = Validations.validateUserForm(formState.values);
        setErrors(error);

        if (!Object.keys(error).length) {
            if (isEditFormMode) {
                formState.values.id = id;
                dispatch(updateUserThunk(formState.values)); //After Redux
                setFormState({ values: {} });
                handleCloseDialogFunc(false);
            } else {
                dispatch(addUserThunk(formState.values)); //After Redux
                setFormState({ values: {} });
            }
        }
    }

    useEffect(() => {
        if (isEditFormMode) {
            setFormState({
                values: {
                    firstname,
                    lastname,
                    city,
                    street,
                    number,
                    zipcode,
                    lat,
                    long,
                    username,
                    password,
                    email,
                    phone
                },

            });
        }
    }, [])

    return (
        <Box>

            <Grid container spacing={2} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        User Form
                    </Typography>
                    <form className="" onSubmit={handleSubmit} id="userForm" autoComplete='off' name="userForm">
                        <Grid container spacing={3} mb={20}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    label="First name*"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['firstname'] ? true : false}
                                    helperText={errors && errors['firstname']}
                                    onChange={handleChange}
                                    value={formState.values.firstname || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    label="Last name*"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['lastname'] ? true : false}
                                    helperText={errors && errors['lastname']}
                                    onChange={handleChange}
                                    value={formState.values.lastname || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="city"
                                    name="city"
                                    label="City*"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['city'] ? true : false}
                                    helperText={errors && errors['city']}
                                    onChange={handleChange}
                                    value={formState.values.city || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="street"
                                    name="street"
                                    label="Street"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onChange={handleChange}
                                    value={formState.values.street || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="number"
                                    name="number"
                                    label="Number"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onChange={handleChange}
                                    value={formState.values.number || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="zipcode"
                                    name="zipcode"
                                    label="Zipcode"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['zipcode'] ? true : false}
                                    helperText={errors && errors['zipcode']}
                                    onChange={handleChange}
                                    value={formState.values.zipcode || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lat"
                                    name="lat"
                                    label="Lat"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onChange={handleChange}
                                    value={formState.values.lat || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="long"
                                    name="long"
                                    label="Long"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onChange={handleChange}
                                    value={formState.values.long || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Username"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['username'] ? true : false}
                                    helperText={errors && errors['username']}
                                    onChange={handleChange}
                                    value={formState.values.username || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['password'] ? true : false}
                                    helperText={errors && errors['password']}
                                    onChange={handleChange}
                                    value={formState.values.password || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    label="Phone"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['phone'] ? true : false}
                                    helperText={errors && errors['phone']}
                                    onChange={handleChange}
                                    value={formState.values.phone || ''}
                                />
                            </Grid>

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