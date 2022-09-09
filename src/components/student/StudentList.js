import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import FormDialog from '../student/FormDialog';
import { setStudentDetail } from '../../redux/slices/studentSlice';
import ConfirmationDialog from '../common/ConfirmationDialog';
import { deleteStudentThunk } from "../../redux/thunk/studentThunk";
import AlertMessage from '../common/AlertMessage';
import StudentForm from './StudentForm';

function StudentList() {
    const studentDataFromStore = useSelector((state) => state.student.studentsList);
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1);
    const [openState, setOpenState] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const columns = [
        {
            name: "firstName",
            label: "First Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "lastName",
            label: "Last Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "city",
            label: "City",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "state",
            label: "State",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "marks",
            label: "Marks",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "Action",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <>
                            <ModeEditIcon className="table-action-icon" onClick={() => editStudentData(dataIndex)} />
                            <DeleteIcon className="table-action-icon" onClick={() => deleteStudentData(dataIndex)} />
                        </>

                    );
                }
            }
        },
    ];

    const options = {
        filterType: 'dropdown',
        search: false,
        download: false,
        print: false,
        viewColumns: false,
        selectableRows: 'none'
    };

    const editStudentData = (dataIndex) => {
        dispatch(setStudentDetail(studentDataFromStore[dataIndex]))
        setOpen(true)
    }

    const deleteStudentData = (dataIndex) => {
        setCurrentSelectedIndex(dataIndex);
        setOpenConfirm(true)
    }

    const handleCloseDialog = () => {
        setCurrentSelectedIndex(-1);
        setOpen(false);
    };

    const handleCloseOkConfirm = () => {
        dispatch(deleteStudentThunk(studentDataFromStore[currentSelectedIndex]));
        setOpenConfirm(false);
        setCurrentSelectedIndex(-1);
        setOpenState(true);
        setMessage("Student Deleted Successfully!");
    };

    const handleCloseCancelConfirm = () => {
        setOpenConfirm(false);
        setCurrentSelectedIndex(-1);
    };

    const handleClose = (event, reason) => {
        setOpenState(false);
    };

    return (
        <>
            <AlertMessage open={openState} message={message} handleClose={handleClose} />
            <MUIDataTable
                title={"Student List"}
                data={studentDataFromStore}
                columns={columns}
                options={options}
            />
            <FormDialog
                openStatus={open}
                handleCloseDialogFunc={handleCloseDialog}
                component={
                    <StudentForm
                        isEditFormMode="1"
                        handleCloseDialogFunc={handleCloseDialog}
                    />
                }
                formTitle="Edit Student"
            />
            <ConfirmationDialog
                openStatus={openConfirm}
                textContent="Are you sure you want to delete this record?"
                confirmOkFunc={handleCloseOkConfirm}
                confirmCancelFunc={handleCloseCancelConfirm}
            />
        </>
    )
}

export default StudentList