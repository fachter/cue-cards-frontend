import React from 'react'



const RoomStructureContext = React.createContext()

class RoomStructureProvider extends React.Component {
    state = {
    setHistoryArray: [],
    currentSetStructure: []

}

setCurrentSetStructure = (newSetStructure) => {
    this.setState({currentSetStructure: newSetStructure})
}

    updateSetHistory = () => {
        this.state.setHistoryArray.push(this.state.currentSetStructure)
    }

    _getLastFolderStructure = () => {
        return this.state.setHistoryArray.pop()
    }

    render(){
        return(
            <RoomStructureContext.Provider value ={{
                setHistoryArray: this.state.setHistoryArray,
                currentSetStructure: this.state.currentSetStructure,
                setCurrentSetStructure: this.setCurrentSetStructure,
                updateSetHistory: this.updateSetHistory,
                _getLastFolderStructure: this._getLastFolderStructure

            }}>
                {this.props.children}
            </RoomStructureContext.Provider>
        )
    }
}

    export default  {RoomStructureProvider, RoomStructureContext}
