const initialState = {
    studentsList: []
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