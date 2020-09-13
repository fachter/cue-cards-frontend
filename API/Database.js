import Axios from 'axios'



function storeMyRoomDataOnDB(listHistoryArray, currentListStructure, userToken) {

    let updatedData = null

    if (listHistoryArray.length > 0) {
        updatedData = {
            folders: listHistoryArray[0],
            lastModified: new Date
        }
    } else {
        updatedData = {
            folders: currentListStructure,
            lastModified: new Date
        }
    }

    Axios.post('https://cue-cards-app.herokuapp.com/api/save-users-data', updatedData, {
        headers: {
            'Authorization': "Bearer " + userToken
        }
    }).then(result => {
        console.log("Die Daten wurden erfolgreich auf dem Server gespeichert:")
    }).catch(error => {
        console.log("Fehler beim speichern der Daten auf dem Server: " + error)
    })
}


function syncAxiosPost(link, sourceName, data, userToken) {

    return new Promise((resolve, reject) => {
        Axios.post(link, data, {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(() => {
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





export { storeMyRoomDataOnDB, syncAxiosPost, asyncAxiosPost, asyncAxiosGet, syncAxiosGet }








