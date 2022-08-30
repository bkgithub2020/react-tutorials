const getLocalStudentItems = () => {
    let studentItems = localStorage.getItem('students')
    if (studentItems) {
        return JSON.parse(localStorage.getItem('students'))
    } else {
        return []
    }
}


const initialState = {
    studentsList: getLocalStudentItems()
}

export const studentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ADD_STUDENT':
            return {
                studentsList: [...state.studentsList, payload]
            };

        default:
            return state
    }
}