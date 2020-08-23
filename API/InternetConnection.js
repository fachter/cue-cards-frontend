

import React from 'react'
import NetInfo from "@react-native-community/netinfo";


const InternetConnectionContext = React.createContext()


class InternetConnectionProvider extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        isConnected: false
    }


    checkIfConnected() {
        return new Promise((resolve, reject) => {
            NetInfo.fetch().then((response) => {
                if (response.isConnected === true) {
                    resolve("Verbindung mit Netzwerk erfolgreich")
                }
                else {
                    reject("Verbindung mit Netzwerk fehlgeschlagen")
                }
                if (this.state.isConnected != response.isConnected) {
                    this.setState({ isConnected: response.isConnected })
                }
            }).catch(error => {
                reject(error)
                console.log("Verbindung zum Netzwerk nicht möglich =>  " + error)
            })




        })


    }


    render() {
        return (
            <InternetConnectionContext.Provider value={{
                checkIfConnected: this.checkIfConnected.bind(this),
                isConnected: this.state.isConnected
            }} >
                {this.props.children}
            </InternetConnectionContext.Provider>
        )
    }

}

export { InternetConnectionContext, InternetConnectionProvider }

