import { UPDATE_USERTOKEN } from '../actions/types'

const initialState = {
    userToken: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERTOKEN:
            return {
                ...state,
                userToken: state.userToken
            }
        default:
            return state;
    }
}

export default userReducer