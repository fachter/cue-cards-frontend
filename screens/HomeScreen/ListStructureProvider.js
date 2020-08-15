import React from 'react'
import { AsyncStorage } from 'react-native'

const ListStructureContext = React.createContext()




class ListStructureProvider extends React.Component {


    state = {
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






    setCurrentSetStructure = (newSetStructure) => {
        this.setState({ currentSetStructure: newSetStructure })
    }

    updateSetHistory = () => {
        this.state.setHistoryArray.push(this.state.currentSetStructure)
    }

    _getLastSetFolderStructure = () => {
        return this.state.setHistoryArray.pop()
    }










    setQuery = (query) => {
        this.setState({ query })
    }

    setFullDat = (fullData) => {
        this.setState({ fullData })
    }

    getQuery = (query) => {
        return this.state.query
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
                // for Rooms
                setHistoryArray: this.state.setHistoryArray,
                currentSetStructure: this.state.currentSetStructure,
                setCurrentSetStructure: this.setCurrentSetStructure,
                updateSetHistory: this.updateSetHistory,
                _getLastSetFolderStructure: this._getLastSetFolderStructure,



                query: this.state.query,
                setQuery: this.setQuery,
                fullData: this.state.fullData,
                setFullData: this.setFullData,
                getQuery: this.getQuery,

            }}>
                {this.props.children}
            </ListStructureContext.Provider>

        )
    }
}

export { ListStructureProvider, ListStructureContext }