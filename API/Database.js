import React, { useContext } from 'react'
import Axios from 'axios'
import { UserContext } from '../screens/LoginRegistrationScreen/UserProvider'


function storeMyRoomDataOnDB(listHistoryArray, currentListStructure) {

    const { userToken } = useContext(UserContext)
    let folders = null

    if (listHistoryArray.length > 0) {
        folders = listHistoryArray[0]
    } else {
        folders = currentListStructure
    }

    Axios.post('https://cue-cards-app.herokuapp.com/save-users-data', { folders: folders }, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(result => {
        console.log("Die Daten wurden erfolgreich auf dem Server gespeichert:")
        console.log(result.config.data)
    }).catch(error => {
        console.log("Fehler beim speichern der Daten auf dem Server: " + error)
    })
}



async function AsyncAxiosPost(data, link, sourceName) {
    const { userToken } = useContext(UserContext)

    const response = await Axios.post(link, { data }, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(() => {
        console.log(`Die ${sourceName} - Daten wurden erfolgreich auf dem Server gespeichert:`)

    }).catch(error => {
        console.log("Fehler beim speichern der Daten auf dem Server: " + error)
    })

    return response

}

function SyncAxiosPost(data, link) {
    const { userToken } = useContext(UserContext)

    const response = Axios.post(link, { data }, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(result => {
        console.log(`Die ${sourceName} - Daten wurden erfolgreich auf dem Server gespeichert:`)
    }).catch(error => {
        console.log(`Fehler beim speichern der ${sourceName} - Daten auf dem Server: ` + error)
    })

    return response
}



async function AsyncAxiosGet(data, link, sourceName) {
    const { userToken } = useContext(UserContext)

    const response = await Axios.post(link, { data }, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(result => {
        console.log(`Die ${sourceName} - Daten wurden erfolgreich vom Server geladen:`)
    }).catch(error => {
        console.log("Fehler beim laden der Daten auf vom Server: " + error)
    })

    return response

}

function SyncAxiosGet(data, link) {
    const { userToken } = useContext(UserContext)

    const response = Axios.post(link, { data }, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(result => {
        console.log(`Die ${sourceName} - Daten wurden erfolgreich vom Server geladen:`)
    }).catch(error => {
        console.log("Fehler beim laden der Daten auf vom Server: " + error)
    })

    return response
}




export { storeMyRoomDataOnDB, AsyncAxiosPost, SyncAxiosPost }









