import React, { useState } from 'react'
import uuid from 'react-native-uuid'


const CopyPasteContext = React.createContext()

class CopyPasteProvider extends React.Component {
    constructor(props) {
        super(props)

        this.copyTheData = this.copyTheData.bind(this)
        this.setSomeThingIsCopied = this.setSomeThingIsCopied.bind(this)


        this.state = {
            copyData: null,
            someThingIsCopied: false
        }
    }



    setSomeThingIsCopied(value) {
        this.setState({ someThingIsCopied: value })
    }

    copyTheData(data) {
        // this.updateAllids(data)
        this.setState({ copyData: data })
        this.setState({ someThingIsCopied: true })
    }


    updateAllids(data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                data[i].id = uuid.v1()
                if (data.cards.length > 0) {
                    this.updateAllids(data.cards)
                }
                if (data.subFolders.length > 0) {
                    this.updateAllids(data.subFolders)
                }
                if (data.answers.length > 0) {
                    this.updateAllids(data.answers)
                }
            }
        }
    }


    render() {
        return (
            <CopyPasteContext.Provider value={{
                copyData: this.state.copyData,
                someThingIsCopied: this.state.someThingIsCopied,
                copyTheData: this.copyTheData,
                pasteTheData: this.pasteTheData,
                setSomeThingIsCopied: this.setSomeThingIsCopied

            }}>
                {this.props.children}
            </CopyPasteContext.Provider>

        )
    }

}

export { CopyPasteProvider, CopyPasteContext }