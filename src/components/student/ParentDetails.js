import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function ParentDetails({ handleChangeCall, currentFormState }) {
    return (
        <>
            <Grid item xs={12} sm={12}>
                <Typography variant="h6"
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        marginTop: '10px'
                    }}>
                    Parent Details
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="fathername"
                    name="fathername"
                    label="Father Name"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeCall}
                    value={currentFormState.values.fathername || ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="mothername"
                    name="mothername"
                    label="Mother Name"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeCall}
                    value={currentFormState.values.mothername || ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="father_occupation"
                    name="father_occupation"
                    label="Father Occupation"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeCall}
                    value={currentFormState.values.father_occupation || ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="mothername_occupation"
                    name="mothername_occupation"
                    label="Mother Occupation"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeCall}
                    value={currentFormState.values.mothername_occupation || ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="father_phone"
                    name="father_phone"
                    label="Father Phone"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeCall}
                    value={currentFormState.values.father_phone || ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="mothername_phone"
                    name="mothername_phone"
                    label="Mother Phone"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeCall}
                    value={currentFormState.values.mothername_phone || ''}
                />
            </Grid>
        </>
    )
}

export default ParentDetails