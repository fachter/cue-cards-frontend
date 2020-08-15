import React from 'react'
import Axios from 'axios'



function storeDataOnDB(listHistoryArray, currentListStructure, userToken) {
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

export { storeDataOnDB }









