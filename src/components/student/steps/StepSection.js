import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextStep from './NextStep';
import PreviousStep from './PreviousStep';
import Button from '@mui/material/Button';
import AlertSuccess from '../../common/AlertSuccess';

function StepSection({ nextFunc, nextStep, previousStep, previousFunc, formComponent, finalStep, submitFunc, openState, message, handleClose }) {
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
                    <form className="" id="studentForm" autoComplete='off' name="studentForm">
                        <Grid container spacing={3} mb={20}>
                            {formComponent}
                            <Grid item xs={12} sm={12} className="step-div">
                                <div className='previous-step-div'>
                                    {
                                        previousStep && <PreviousStep onClick={previousFunc} />
                                    }
                                </div>
                                <div className='next-step-div'>
                                    {
                                        nextStep && <NextStep onClick={nextFunc} />
                                    }
                                    {
                                        finalStep && <Button className="step-btn" variant="outlined" onClick={submitFunc}>Finish</Button>
                                    }
                                </div>
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box >
    )
}

export default StepSection