import React, { useContext } from 'react'
import Axios from 'axios'

import { UserContext } from '../screens/LoginRegistrationScreen/UserProvider'




async function storeDataOnDB(data) {
    console.log("yep")

    const { retrievetTokenFromDevice } = useContext(UserContext)

    Axios.post('https://cue-cards-app.herokuapp.com/save-users-data', { data }, {
        headers: {
            'Authorization': "Bearer " + await retrievetTokenFromDevice()
        }
    }).then(() => {

    }).catch(error => {
        console.log(error)
    })
}

export { storeDataOnDB }