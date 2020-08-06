import React, { useState } from 'react'

const CopyPasteContext = React.createContext()

class CopyPasteProvider extends React.Component {

    state = {
        copyData: null
    }


    copyTheData(data) {
        this.setState({ copyData: data })
    }

    render() {
        return (
            <CopyPasteContext.Provider value={{
                data: this.state.copyData,
                copyTheData: this.copyTheData

            }}>

            </CopyPasteContext.Provider>

        )
    }

}