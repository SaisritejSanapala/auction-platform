const initialState = {
    value: false
}

export const addProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLICKED":
            return {
                ...state, value: action.payload
            }

        case "CLOSE":
            return {
                ...state, value: action.payload
            }

        default:
            return state;
    }
}




