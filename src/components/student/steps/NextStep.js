import React from 'react';
import Button from '@mui/material/Button';

function NextStep({ onClick }) {
    return (
        <>
            <Button className="step-btn" variant="outlined" onClick={onClick}>Next</Button>
        </>
    )
}

export default NextStep;