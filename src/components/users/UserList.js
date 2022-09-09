import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import FormDialog from '../student/FormDialog';
import { setUserDetail } from '../../redux/slices/userSlice';
import ConfirmationDialog from '../common/ConfirmationDialog';
import { deleteUserThunk, getUsersThunk } from "../../redux/thunk/userThunk";
import AlertMessage from '../common/AlertMessage';
import UserForm from './UserForm';

function UserList() {
    const userDataFromStore = useSelector((state) => state.userReducer.usersList);
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1);
    const [openState, setOpenState] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunk());
    }, [])

    const columns = [
        {
            name: "name.firstname",
            label: "First Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "name.lastname",
            label: "Last Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "address.city",
            label: "City",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "address.zipcode",
            label: "Zip",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "phone",
            label: "Phone",
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
                            <ModeEditIcon className="table-action-icon" onClick={() => editUserData(dataIndex)} />
                            <DeleteIcon className="table-action-icon" onClick={() => deleteUserData(dataIndex)} />
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
        selectableRows: 'none',
        enableNestedDataAccess: '.'
    };

    const editUserData = (dataIndex) => {
        dispatch(setUserDetail(userDataFromStore[dataIndex]))
        setOpen(true)
    }

    const deleteUserData = (dataIndex) => {
        setCurrentSelectedIndex(dataIndex);
        setOpenConfirm(true)
    }

    const handleCloseDialog = () => {
        setCurrentSelectedIndex(-1);
        setOpen(false);
    };

    const handleCloseOkConfirm = () => {
        dispatch(deleteUserThunk(userDataFromStore[currentSelectedIndex]));
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
                title={"User List"}
                data={userDataFromStore}
                columns={columns}
                options={options}
            />
            <FormDialog
                openStatus={open}
                handleCloseDialogFunc={handleCloseDialog}
                component={
                    <UserForm
                        isEditFormMode="1"
                        handleCloseDialogFunc={handleCloseDialog}
                    />
                }
                formTitle="Edit User"
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

export default UserList