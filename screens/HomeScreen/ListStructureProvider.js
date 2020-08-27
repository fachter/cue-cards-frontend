import React from 'react'
import { AsyncStorage } from 'react-native'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'
import { storeMyRoomDataOnDB } from '../../API/Database'

const ListStructureContext = React.createContext()



class ListStructureProvider extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)

        this.state = {
            listHistoryArray: [],
            currentListStructure: [],
            isFolder: true,
            CreateFileWindowVisible: false,  //PopupFenster um neue Datei anzuulegen
            CreateNewCardWindowVisible: false,
            dataIsLoading: true,
            query: "",
            fullData: [],
            setHistoryArray: [],
            currentSetStructure: []
        }
        this.storeDataOnDevice = this.storeDataOnDevice.bind(this)
    }


    storeDataOnDevice(newListStructure) {
        try {
            if (this.state.listHistoryArray.length > 0) {
                AsyncStorage.setItem(
                    'mainListStructure', JSON.stringify({
                        Folders: this.state.listHistoryArray[0],
                        lastEdit: new Date().getTime()

                    }),
                )
            } else {
                AsyncStorage.setItem(
                    'mainListStructure', JSON.stringify(newListStructure),
                )
            }
            console.log("Daten wurden auf dem Gerät gespeichert")
        } catch (error) {
            console.log("Fehler speichern der Daten auf das Gerät: " + error)
        }
    }


    retrieveDataFromDevice = async () => {
        try {
            const value = await AsyncStorage.getItem('mainListStructure');
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

        const user = this.context
        storeMyRoomDataOnDB(this.state.listHistoryArray, this.state.currentListStructure, user.userToken)
        this.storeDataOnDevice(newListStructure)
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


            }}>
                {this.props.children}
            </ListStructureContext.Provider>

        )
    }
}

export { ListStructureProvider, ListStructureContext }