import Axios from 'axios'



function storeMyRoomDataOnDB(listHistoryArray, newListStructure, userToken) {

    let updatedRoom = {
        folders: null,
        lastModified: new Date
    }

    if (listHistoryArray.length > 0) {
        updatedRoom.folders = listHistoryArray[0]
    } else {
        updatedRoom.folders = newListStructure
    }

    console.log('######## SAVE MY ROOOM DATA')
    console.log(updatedRoom)

    Axios.post('https://cue-cards-app.herokuapp.com/api/save-users-data', updatedRoom, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(result => {
        console.log("'MyRoom' Daten wurden erfolgreich auf dem Server gespeichert")
    }).catch(error => {
        console.log("Fehler beim speichern der Daten 'MyRoom' auf dem Server: " + error)
    })
}


function storyExternRoomDataOnDB(listHistoryArray, newListStructure, currentRoomInfo, userToken) {



    let updatedRoom = {
        data: {
            folders: null,
            lastModified: new Date
        },
        id: currentRoomInfo.id,
        name: currentRoomInfo.name,
        pictureNumber: currentRoomInfo.pictureNumber

    }

    if (listHistoryArray.length > 0) {
        updatedRoom.data.folders = listHistoryArray[0]
    } else {
        updatedRoom.data.folders = newListStructure
    }

    console.log('######## SAVE EXTERN ROOOM DATA')
    console.log(updatedRoom)


    Axios.post(`https://cue-cards-app.herokuapp.com/api/room`, updatedRoom, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(mes => {
        console.log('Verbindung zum Server erfolgreich. Daten wurde gespeichert')
    }).catch(mes => {
        console.log('Verbindung zum Server' + mes)
        alert("Verbindung zum Sever fehlgeschlagen. Probleme beim speichern/laden der Daten")
    })
}


function syncAxiosPost(link, sourceName, data, userToken) {


    return new Promise((resolve, reject) => {
        Axios.post(link, data, {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(res => {

            resolve('erfolgreich')
            console.log(`Axios Post, Quelldatei: ${sourceName} - erfolgreich:`)
        }).catch(error => {
            reject('fehlgschlagen')
            console.log(`Axios Post, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
        })


    })

}


async function asyncAxiosPost(link, sourceName, data, userToken) {

    return new Promise(async (resolve, reject) => {

        await Axios.post(link, data, {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(res => {
            resolve(res)
            console.log(`Axios Get, Quelldatei: ${sourceName} - erfolgreich:`)
        }).catch(error => {
            reject(error)
            console.log(`Axios Post, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
        })
    })
}




async function asyncAxiosGet(link, sourceName, userToken) {
    return new Promise(async (resolve, reject) => {

        await Axios.get(link, {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(res => {
            resolve(res)
            console.log(`Axios Get, Quelldatei: ${sourceName} - erfolgreich:`)
        }).catch(error => {
            reject(error)
            console.log(`Axios Get, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
        })
    })
}



function syncAxiosGet(link, sourceName, userToken) {
    Axios.get(link, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(result => {
        console.log(`Axios Post, Quelldatei: ${sourceName} - erfolgreich:`)
    }).catch(error => {
        console.log(`Axios Post, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
    })
}





export { storeMyRoomDataOnDB, storyExternRoomDataOnDB, syncAxiosPost, asyncAxiosPost, asyncAxiosGet, syncAxiosGet }








