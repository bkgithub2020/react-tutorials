import React from 'react';
import Button from '@mui/material/Button';

function PreviousStep({ onClick }) {
    return (
        <>
            <Button className="step-btn" variant="outlined" onClick={onClick}>Previous</Button>
        </>
    )
}

export default PreviousStep;