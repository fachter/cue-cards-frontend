

import React from 'react'
import NetInfo from "@react-native-community/netinfo";

const InternetConnectionContext = React.createContext()

class InternetConnectionProvider extends React.Component {


    state = {
        isConnected: false
    }




    checkIfConnected() {
        NetInfo.fetch().then((response) => {
            this.setState({ isConnected: response.isConnected })
        }).catch(error => {
            console.log("Verbindung zum Netzwerk nicht möglich =>  " + error)
        })


    };

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

