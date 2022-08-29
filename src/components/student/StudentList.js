import React from 'react';
import MUIDataTable from "mui-datatables";


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
];

const options = {
    filterType: 'dropdown',
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    selectableRows: false
};



function StudentList({ studentData }) {

    return (
        <>
            <MUIDataTable
                title={"Student List"}
                data={studentData}
                columns={columns}
                options={options}
            />
        </>
    )
}

export default StudentList