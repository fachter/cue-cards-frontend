import { UPDATE_USERTOKEN } from './types'



export const updateUserToken = (token) => (
    {
        type: UPDATE_USERTOKEN,
        data: token,
    }
)