import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Paper from '@mui/material/Paper';

function PaperComponent(props) {
    return (
        <>
            <Paper {...props} />
        </>
    );
}

export default function ConfirmationDialog({ openStatus, textContent = "", confirmOkFunc, confirmCancelFunc, handleCloseDialogFunc }) {

    return (
        <div>
            <Dialog
                open={openStatus}
                onClose={handleCloseDialogFunc}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                        {textContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={confirmCancelFunc}>
                        Cancel
                    </Button>
                    <Button onClick={confirmOkFunc}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
