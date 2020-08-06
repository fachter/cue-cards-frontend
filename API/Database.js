import React from 'react'
import Axios from 'axios'
import { UserProvider } from '../screens/LoginRegistrationScreen/UserProvider'
import { DatePicker } from 'native-base'





export default class Database extends React.Component {



    static storeDataOnDB(listHistoryArray, currentListStructure, userToken) {

        let data = null
        if (listHistoryArray.length > 0) {
            data = listHistoryArray[0]
        } else {
            data = currentListStructure
        }

        Axios.post('https://cue-cards-app.herokuapp.com/save-users-data', { data }, {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }


}






