import React from 'react'
import { AsyncStorage } from 'react-native'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'

import { storeMyRoomDataOnDB, syncAxiosPost } from '../../API/Database'

const ListStructureContext = React.createContext()

class ListStructureProvider extends React.Component {
    static contextType = UserContext

    constructor(props) {
        super(props)

        this.state = {
            currentRoomID: null,
            listHistoryArray: [],
            currentListStructure: [],
            isFolder: true,
            CreateFileWindowVisible: false,  //PopupFenster um neue Datei anzuulegen
            CreateNewCardWindowVisible: false,
            dataIsLoading: true,
        }
        this.storeDataOnDevice = this.storeDataOnDevice.bind(this)
        this.setCurrentRoomID = this.setCurrentRoomID.bind(this)
    }


    storeDataOnDevice(newListStructure) {
        try {
            if (this.state.listHistoryArray.length > 0) {
                AsyncStorage.setItem(
                    'myRoomData', JSON.stringify({
                        data: {
                            folders: this.state.listHistoryArray[0],
                            lastModified: new Date
                        }
                    }),
                )
            } else {
                AsyncStorage.setItem(
                    'myRoomData', JSON.stringify({
                        data: {
                            folders: newListStructure,
                            lastModified: new Date
                        }
                    }),
                )
            }
            console.log("Daten wurden auf dem Gerät gespeichert")
        } catch (error) {
            console.log("Fehler speichern der Daten auf das Gerät: " + error)
        }
    }


    retrieveDataFromDevice = async () => {
        try {
            const value = await AsyncStorage.getItem('myRoomData');
            if (value != null) {
                let data = JSON.parse(value)
                console.log("Daten wurden vom gerät geladen")
                return data
            }
        } catch (error) {
            console.log("Fehler beim laden der Daten vom Gerät: " + error)
            return null
        }
    }



    setCurrentListStructure = (newListStructure) => {

        this.setState({ currentListStructure: newListStructure })

        if (this.state.currentRoomID === 'myRoom') {
            this.saveMyData(newListStructure)

        } else {
            // this.saveRoomData(newListStructure)
        }
    }


    saveMyData(newListStructure) {
        const { listHistoryArray } = this.state
        const user = this.context
        this.storeDataOnDevice(newListStructure)
        user.checkIfConnected()
            .then(res => {
                console.log('Verbindung zum Netzwerk ' + res)
                storeMyRoomDataOnDB(listHistoryArray, newListStructure, user.userToken)
            })
            .catch(res => {
                console.log('Verbindung zum Server ' + res)
                alert("Verbindung zum Netzwerk fehlgeschlagen, Daten konnten nicht auf dem Server gespeichert werden")
            })
    }


    saveRoomData(newListStructure) {
        const { currentRoomID } = this.state
        const user = this.context

        let updatetData = {
            folders: newListStructure,
            lastModified: new Date
        }

        user.checkIfConnected()
            .then(res => {
                console.log("AAA")
                console.log('Verbindung zum Netzwerk ' + res)
                syncAxiosPost(`https://cue-cards-app.herokuapp.com/api/room/${currentRoomID}`, 'ListStructureProvider', updatetData, user.userToken)  //LINK FEHLT !
                    .catch(mes => {
                        console.log('Verbindung zum Server' + mes)
                        alert("Verbindung zum Sever fehlgeschlagen. Probleme beim speichern/laden der Daten")
                    })
            }).catch(res => {
                console.log("BBB")
                console.log('Verbindung zum Netzwerk ' + res)
                alert("Verbindung zum Sever fehlgeschlagen. Probleme beim speichern/laden der Daten")
            })
    }



    updateFolderHistory = () => {
        this.state.listHistoryArray.push(this.state.currentListStructure)
    }

    _getLastFolderStructure = () => {
        return this.state.listHistoryArray.pop()
    }

    setIsFolder = (isFolder) => {
        this.setState({ isFolder })
    }

    setCreateFileWindowVisible = (CreateFileWindowVisible) => {
        this.setState({ CreateFileWindowVisible })
    }

    setCreateNewCardWindowVisible = (value) => {
        this.setState({ CreateNewCardWindowVisible: value })
    }

    setDataIsLoading(value) {
        this.setState({ dataIsLoading: value })
    }

    setCurrentRoomID(value) {
        this.state.currentRoomID = value
    }


    render() {
        return (
            <ListStructureContext.Provider value={{
                mainlistStructure: this.state.mainlistStructure,
                setMainListStructure: this.setMainListStructure,
                listHistoryArray: this.state.listHistoryArray,
                updateFolderHistory: this.updateFolderHistory,
                _getLastFolderStructure: this._getLastFolderStructure,
                currentListStructure: this.state.currentListStructure,
                setCurrentListStructure: this.setCurrentListStructure,
                isFolder: this.state.isFolder,
                setIsFolder: this.setIsFolder,
                CreateFileWindowVisible: this.state.CreateFileWindowVisible,
                setCreateFileWindowVisible: this.setCreateFileWindowVisible,
                CreateNewCardWindowVisible: this.state.CreateNewCardWindowVisible,
                setCreateNewCardWindowVisible: this.setCreateNewCardWindowVisible,
                storeDataOnDevice: this.storeDataOnDevice,
                retrieveDataFromDevice: this.retrieveDataFromDevice,
                dataIsLoading: this.state.dataIsLoading,
                setDataIsLoading: this.setDataIsLoading,
                currentRoomID: this.state.currentRoomID,
                setCurrentRoomID: this.setCurrentRoomID,


            }}>
                {this.props.children}
            </ListStructureContext.Provider>

        )
    }
}

export { ListStructureProvider, ListStructureContext }