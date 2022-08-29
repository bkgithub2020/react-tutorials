import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function AddressDetails({ handleChangeCall, currentFormState, submittedStatus, stepValidation = true }) {
    return (
        <>
            <Grid item xs={12} sm={12}>
                <Typography variant="h6"
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        marginTop: '10px'
                    }}>
                    Address Details
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="address1"
                    name="address1"
                    label="Address line 1*"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    error={(submittedStatus || !stepValidation) && !currentFormState.values.address1 ? true : false}
                    helperText={
                        (submittedStatus || !stepValidation) && !currentFormState.values.address1
                            ? "This field is required" : ""
                    }
                    onChange={handleChangeCall}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    onChange={handleChangeCall}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="city"
                    name="city"
                    label="City*"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    error={(submittedStatus || !stepValidation) && !currentFormState.values.city ? true : false}
                    helperText={
                        (submittedStatus || !stepValidation) && !currentFormState.values.city
                            ? "This field is required" : ""
                    }
                    onChange={handleChangeCall}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region*"
                    fullWidth
                    variant="standard"
                    error={(submittedStatus || !stepValidation) && !currentFormState.values.state ? true : false}
                    helperText={
                        (submittedStatus || !stepValidation) && !currentFormState.values.state
                            ? "This field is required" : ""
                    }
                    onChange={handleChangeCall}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="zip"
                    name="zip"
                    label="Zip / Postal code*"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                    error={(submittedStatus || !stepValidation) && !currentFormState.values.zip ? true : false}
                    helperText={
                        (submittedStatus || !stepValidation) && !currentFormState.values.zip
                            ? "This field is required" : ""
                    }
                    onChange={handleChangeCall}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="country"
                    name="country"
                    label="Country*"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    error={(submittedStatus || !stepValidation) && !currentFormState.values.country ? true : false}
                    helperText={
                        (submittedStatus || !stepValidation) && !currentFormState.values.country
                            ? "This field is required" : ""
                    }
                    onChange={handleChangeCall}
                />
            </Grid>
        </>
    )
}

export default AddressDetails