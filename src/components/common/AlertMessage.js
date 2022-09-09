import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function AlertSuccess({ message, open, handleClose, errorStatus = false }) {
    const alertType = errorStatus ? 'error' : 'success';
    return (
        <>
            <Snackbar
                open={open}
                message="Cool styling!"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                autoHideDuration={1500}
                onClose={handleClose}
            >
                <Alert severity={alertType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AlertSuccess