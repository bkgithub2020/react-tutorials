import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

function PersonalDetails({ handleChangeCall, currentFormState, submittedStatus, stepValidation = true }) {

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Typography variant="h6"
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        marginTop: '10px'
                    }}>
                    Personal Details
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="firstName"
                    name="firstName"
                    label="First name*"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    error={(submittedStatus || !stepValidation) && !currentFormState.values.firstName ? true : false}
                    helperText={
                        (submittedStatus || !stepValidation) && !currentFormState.values.firstName
                            ? "This field is required" : ""
                    }
                    onChange={handleChangeCall}
                    value={currentFormState.values.firstName || ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last name*"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    error={(submittedStatus || !stepValidation) && !currentFormState.values.lastName ? true : false}
                    helperText={
                        (submittedStatus || !stepValidation) && !currentFormState.values.lastName
                            ? "This field is required" : ""
                    }
                    onChange={handleChangeCall}
                    value={currentFormState.values.lastName || ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="standard"
                    sx={{
                        minWidth: 120, display: 'flex',
                        justifyContent: 'left',
                        marginTop: '10px'
                    }}
                >
                    <InputLabel id="genderLabel">Gender*</InputLabel>
                    <Select
                        labelId="genderLabel"
                        name="gender"
                        id="gender"
                        label="Gender*"
                        value=""
                        error={(submittedStatus || !stepValidation) && !currentFormState.values.gender ? true : false}
                        onChange={handleChangeCall}
                        value={currentFormState.values.gender || ''}
                    >
                        <MenuItem value=''>Select</MenuItem>
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                    </Select>
                    <FormHelperText className='helper-error'>{(submittedStatus || !stepValidation) && !currentFormState.values.gender ? "This field is required" : ""}</FormHelperText>
                </FormControl>
            </Grid>
        </>
    )
}

export default PersonalDetails;