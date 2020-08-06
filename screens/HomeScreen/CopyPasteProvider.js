import React, { useState } from 'react'
import uuid from 'react-native-uuid'


const CopyPasteContext = React.createContext()

class CopyPasteProvider extends React.Component {
    constructor(props) {
        super(props)

        this.copyTheData = this.copyTheData.bind(this)



        this.state = {
            copyData: null,
            someThingIsCopied: false
        }
    }




    copyTheData(data) {
        this.setState({ copyData: data })
        this.setState({ someThingIsCopied: true })
    }


    updateAllIDs() {
        // let data = []

        // for(let i = 0; i < data.length; i++){
        //     data[i].
        // }
    }


    render() {
        return (
            <CopyPasteContext.Provider value={{
                copyData: this.state.copyData,
                someThingIsCopied: this.state.someThingIsCopied,
                copyTheData: this.copyTheData,
                pasteTheData: this.pasteTheData

            }}>
                {this.props.children}
            </CopyPasteContext.Provider>

        )
    }

}

export { CopyPasteProvider, CopyPasteContext }