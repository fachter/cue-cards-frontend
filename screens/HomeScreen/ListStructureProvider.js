import React from 'react'
import { AsyncStorage } from 'react-native'


const ListStructureContext = React.createContext()


class ListStructureProvider extends React.Component {

    state = {
        listHistoryArray: [],
        currentListStructure: [],
        isFolder: true,
        CreateFileWindowVisible: false,  //PopupFenster um neue Datei anzuulegen
        dataIsLoading: true,
        query: "",
        fullData: []
    }



    storeDataOnDevice = async () => {
        try {
            if (this.state.listHistoryArray.length > 0) {
                await AsyncStorage.setItem(
                    'mainListStructure', JSON.stringify(this.state.listHistoryArray[0]),
                )
            } else {
                await AsyncStorage.setItem(
                    'mainListStructure', JSON.stringify(this.state.currentListStructure),
                )
            }
        } catch (error) {
            console.log("error by store data in lokal storage: " + error)

        }
    }


    retrieveDataFromDevice = async () => {
        try {
            const value = await AsyncStorage.getItem('mainListStructure');
            if (value != null) {
                this.state.currentListStructure = JSON.parse(value)
                this.setDataIsLoading(false)

            }
        } catch (error) {
            console.log("error by retrieve data vom lokal storage: " + error)
        }
    }


    setCurrentListStructure = (newListStructure) => {
        this.setState({ currentListStructure: newListStructure })
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

    setDataIsLoading(value) {
        this.setState({ dataIsLoading: value })
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
                storeDataOnDevice: this.storeDataOnDevice,
                retrieveDataFromDevice: this.retrieveDataFromDevice,
                dataIsLoading: this.state.dataIsLoading,
                setDataIsLoading: this.setDataIsLoading,



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