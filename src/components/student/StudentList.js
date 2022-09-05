import React from 'react';
import MUIDataTable from "mui-datatables";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import FormDialog from '../student/FormDialog';
import { setStudentDetail } from '../../redux/slices/studentSlice';


function StudentList({ studentData }) {
    const studentDataFromStore = useSelector((state) => state.student.studentsList);
    const [open, setOpen] = React.useState(false);
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
                            <DeleteIcon className="table-action-icon" onClick={() => editStudentData(dataIndex)} />
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

    const deleteStudentData = () => {

    }

    const handleCloseDialog = () => {
        setOpen(false);
    };


    return (
        <>
            <MUIDataTable
                title={"Student List"}
                data={studentDataFromStore}
                columns={columns}
                options={options}
            />
            <FormDialog openStatus={open} handleCloseDialogFunc={handleCloseDialog} />
        </>
    )
}

export default StudentList