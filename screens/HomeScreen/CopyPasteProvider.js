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
            someThingIsCopied: false,
            copiedItemIsCard: false,
        }
    }



    setSomeThingIsCopied(value) {
        this.setState({ someThingIsCopied: value })

        if (value === false) {
            this.state.copyData = null
        }
    }

    copyTheData(data) {
        this.setState({ copyData: this.updateAllids({ ...data }) })
        if (data.isFolder == undefined) {
            this.setState({ copiedItemIsCard: true })
        }
        this.setState({ someThingIsCopied: true })
    }

    setCopiedItemIsCard(value) {
        this.setState({ copiedItemIsCard: value })

    }

    updateAllids(data) {

        data.id = uuid.v1()
        if (data.cards != undefined) {
            for (let i = 0; i < data.cards.length; i++) {
                this.updateAllids(data.cards[i])
            }
        }
        if (data.subFolders != undefined) {
            for (let i = 0; i < data.subFolders.length; i++) {
                this.updateAllids(data.subFolders[i])
            }
        }
        if (data.answers != undefined) {
            for (let i = 0; i < data.answers.length; i++) {
                this.updateAllids(data.answers[i])
            }
        }
        return data
    }


    render() {
        return (
            <CopyPasteContext.Provider value={{
                copyData: this.state.copyData,
                someThingIsCopied: this.state.someThingIsCopied,
                copyTheData: this.copyTheData,
                pasteTheData: this.pasteTheData,
                setSomeThingIsCopied: this.setSomeThingIsCopied,
                copiedItemIsCard: this.state.copiedItemIsCard,
                setCopiedItemIsCard: this.setCopiedItemIsCard

            }}>
                {this.props.children}
            </CopyPasteContext.Provider>

        )
    }

}

export { CopyPasteProvider, CopyPasteContext }