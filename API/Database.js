import React from 'react'
import Axios from 'axios'
import { UserContext } from '../screens/LoginRegistrationScreen/UserProvider'



function storeMyRoomDataOnDB(listHistoryArray, currentListStructure, userToken) {

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


function syncAxiosPost(link, sourceName, data, userToken) {

    return new Promise((resolve, reject) => {
        Axios.post(link, { data }, {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(() => {
            console.log(`Axios Get, Quelldatei: ${sourceName} - erfolgreich:`)
            resolve('erfolgreich')
        }).catch(() => {
            console.log(`Axios Post, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
            reject('fehlgeschlagen')
        })
    })
}


async function asyncAxiosPost(link, sourceName, data) {
    const user = this.context

    return new Promise((resolve, reject) => {

        Axios.post(link, { data }, {
            headers: {
                'Authorization': "Bearer " + user.userToken
            }
        }).then(res => {
            resolve(res)
            console.log(`Axios Get, Quelldatei: ${sourceName} - erfolgreich:`)
        }).catch(error => {
            reject()
            console.log(`Axios Post, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
        })
    })
}




const DatabaseContext = React.createContext()

class DatabaseProvider extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)
    }












    asyncAxiosGet = async (link, sourceName) => {
        const user = this.context

        const response = await Axios.get(link, {
            headers: {
                'Authorization': "Bearer " + user.userToken
            }
        }).then(() => {
            console.log(`Axios Get, Quelldatei: ${sourceName} - erfolgreich:`)
        }).catch(error => {
            console.log(`Axios Get, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
        })

        return response

    }

    syncAxiosGet(link, sourceName) {
        const user = this.context

        const response = Axios.get(link, {
            headers: {
                'Authorization': "Bearer " + user.userToken
            }
        }).then(result => {
            console.log(`Axios Post, Quelldatei: ${sourceName} - erfolgreich:`)
        }).catch(error => {
            console.log(`Axios Post, Quelldatei: ${sourceName} - fehlgeschlagen:` + error)
        })
        return response
    }


    render() {
        return (
            <DatabaseContext.Provider value={{
                asyncAxiosPost: this.asyncAxiosPost,
                asyncAxiosGet: this.asyncAxiosGet,
                syncAxiosGet: this.syncAxiosGet
            }}>
                {this.props.children}
            </DatabaseContext.Provider>
        )
    }
}



// const mapStateToProps = (state) => {
//     return {
//         userToken: state.userToken
//     }
// }




export default DatabaseProvider
export { DatabaseContext, storeMyRoomDataOnDB, syncAxiosPost, asyncAxiosPost }








