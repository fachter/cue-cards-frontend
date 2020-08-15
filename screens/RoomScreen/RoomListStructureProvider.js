import React from 'react'
import { AsyncStorage } from 'react-native'


const RoomListStructureContext = React.createContext()




class RoomListStructureProvider extends React.Component {

    state = {
        listRoomHistoryArray: [],
        isFolder: true,
        CreateRoomFileWindowVisible: false,  //PopupFenster um neue Datei anzuulegen
        CreateRoomNewCardWindowVisible: false,
        dataRoomIsLoading: true,
        roomQuery: "",
        fullRoomData: [],
        setRoomHistoryArray: [],
        currentRoomStructure: [],
        ContainRoomVisible: false
    }

    storeRoomDataOnDevice = async () => {
        try {
            if (this.state.listRoomHistoryArray.length > 0) {
                await AsyncStorage.setItem(
                    'mainListStructure', JSON.stringify(this.state.listRoomHistoryArray[0]),
                )
            } else {
                await AsyncStorage.setItem(
                    'mainListStructure', JSON.stringify(this.state.currentRoomListStructure),
                )
            }
        } catch (error) {
            console.log("Fehler speichern der Daten auf das Gerät: " + error)

        }
    }


    retrieveDataFromDevice = async () => {
        try {
            const value = await AsyncStorage.getItem('mainListStructure');
            if (value != null) {
                let data = JSON.parse(value)
                return data
            }
        } catch (error) {
            console.log("Fehler beim laden der Daten vom Gerät: " + error)
            return null
        }
    }


    setCurrentRoomStructure = (newListStructure) => {
        this.setState({ currentRoomStructure: newListStructure })
    }

    setContainRoomVisible = (ContainRoomVisible) => {
        this.setState({ ContainRoomVisible })
    }

    updateFolderHistory = () => {
        this.state.listRoomHistoryArray.push(this.state.currentRoomStructure)
    }

    _getLastFolderStructure = () => {
        return this.state.listRoomHistoryArray.pop()
    }

    setIsFolder = (isFolder) => {
        this.setState({ isFolder })
    }

    setRoomCreateFileWindowVisible = (CreateRoomFileWindowVisible) => {
        this.setState({ CreateRoomFileWindowVisible })
    }

    setRoomCreateNewCardWindowVisible = (value) => {
        this.setState({ CreateRoomNewCardWindowVisible: value })
    }

    setDataIsLoading(value) {
        this.setState({ dataIsLoading: value })
    }






    setCurrentRoomStructure = (newRoomStructure) => {
        this.setState({ currentRoomStructure: newRoomStructure })
    }

    updateSetHistory = () => {
        this.state.setRoomHistoryArray.push(this.state.currentRoomListStructure)
    }

    _getLastSetFolderStructure = () => {
        return this.state.setRoomHistoryArray.pop()
    }










    setQuery = (query) => {
        this.setState({ query })
    }

    setFullDat = (fullData) => {
        this.setState({ fullData })
    }

    getQuery = (query) => {
        return this.state.roomQuery
    }


    render() {
        return (
            <RoomListStructureContext.Provider value={{
                mainlistStructure: this.state.mainlistStructure,
                setMainListStructure: this.setMainListStructure,
                listRoomHistoryArray: this.state.listRoomHistoryArray,
                updateFolderHistory: this.updateFolderHistory,
                _getLastFolderStructure: this._getLastFolderStructure,
                currentRoomStructure: this.state.currentRoomStructure,
                setCurrentRoomStructure: this.setCurrentRoomStructure,
                isFolder: this.state.isFolder,
                setIsFolder: this.setIsFolder,
                CreateRoomFileWindowVisible: this.state.CreateRoomFileWindowVisible,
                setRoomCreateFileWindowVisible: this.setRoomCreateFileWindowVisible,
                CreateRoomNewCardWindowVisible: this.state.CreateRoomNewCardWindowVisible,
                setRoomCreateNewCardWindowVisible: this.setRoomCreateNewCardWindowVisible,
                storeRoomDataOnDevice: this.storeRoomDataOnDevice,
                retrieveDataFromDevice: this.retrieveDataFromDevice,
                dataIsLoading: this.state.dataRoomIsLoading,
                setDataIsLoading: this.setDataIsLoading,
                // for Rooms
                setHistoryArray: this.state.setRoomHistoryArray,
                ContainRoomVisible: this.state.ContainRoomVisible,
                setContainRoomVisible: this.setContainRoomVisible,
                updateSetHistory: this.updateSetHistory,
                _getLastSetFolderStructure: this._getLastSetFolderStructure,



                query: this.state.roomQuery,
                setQuery: this.setQuery,
                fullData: this.state.fullRoomData,
                setFullData: this.setFullData,
                getQuery: this.getQuery,

            }}>
                {this.props.children}
            </RoomListStructureContext.Provider>

        )
    }
}

export { RoomListStructureProvider, RoomListStructureContext }