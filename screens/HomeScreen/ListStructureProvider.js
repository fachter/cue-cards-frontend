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
            currentRoomInfo: null,
            listHistoryArray: [],
            currentListStructure: [],
            isFolder: true,
            CreateFileWindowVisible: false,  //PopupFenster um neue Datei anzuulegen
            CreateNewCardWindowVisible: false,
            dataIsLoading: true,
        }
        this.storeDataOnDevice = this.storeDataOnDevice.bind(this)
        this.setCurrentRoomInfo = this.setCurrentRoomInfo.bind(this)
        this.saveRoomData = this.saveRoomData.bind(this)
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



    setCurrentListStructure = (newListStructure, saveOnDB) => {
        this.setState({ currentListStructure: newListStructure })
        //console.log(this.state.currentRoomInfo)
        if (this.state.currentRoomInfo === 'myRoom') {
            this.saveMyData(newListStructure, saveOnDB)

        } else {
            if (saveOnDB !== false) {
                this.saveRoomData(newListStructure)
            }
        }
    }


    saveMyData(newListStructure, saveOnDB) {
        const { listHistoryArray } = this.state
        const user = this.context
        this.storeDataOnDevice(newListStructure)
        if (saveOnDB !== false) {
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
    }


    saveRoomData(newListStructure) {
        const { currentRoomInfo } = this.state
        const user = this.context

        let updatedRoom = {
            data: {
                folders: newListStructure,
                lastModified: new Date
            },
            id: currentRoomInfo.id,
            name: currentRoomInfo.name,
            pictureNumber: currentRoomInfo.pictureNumber

        }

        user.checkIfConnected()
            .then(res => {
                syncAxiosPost(`https://cue-cards-app.herokuapp.com/api/room`, 'ListStructureProvider', updatedRoom, user.userToken)
                    .then(mes => {
                        console.log('Verbindung zum Server ' + mes + '. Daten wurde gespeichert')
                    }).catch(mes => {
                        console.log('Verbindung zum Server' + mes)
                        alert("Verbindung zum Sever fehlgeschlagen. Probleme beim speichern/laden der Daten")
                    })
            }).catch(res => {
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

    setCurrentRoomInfo(value) {
        this.state.currentRoomInfo = value
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
                currentRoomInfo: this.state.currentRoomInfo,
                setCurrentRoomInfo: this.setCurrentRoomInfo,


            }}>
                {this.props.children}
            </ListStructureContext.Provider>

        )
    }
}

export { ListStructureProvider, ListStructureContext }