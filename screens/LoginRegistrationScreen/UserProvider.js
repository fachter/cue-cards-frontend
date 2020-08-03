import React from 'react'
import { AsyncStorage } from 'react-native'

const UserContext = React.createContext()

export default class UserProvider extends React.Component {

    state = {
        isLoggedin: true,
    }


    async _storeToken(token) {
        try {
            await AsyncStorage.setItem(
                'userToken', token
            );
            console.log("Token wurde lokal gespeichert")
        } catch (error) {
            console.log("Fehler beim speichern des Tokens: " + error)
        }
    }


    login = () => {
        console.log("login")
        this.setState({ isLoggedin: true })
    }

    logout = () => {
        console.log("lgouut")
        this.setState({ isLoggedin: false })
    }



    render() {
        return (
            <UserContext.Provider value={{
                isLoggedin: this.state.isLoggedin,
                logout: this.logout,
                login: this.login,
                _storeToken: this._storeToken

            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}


export { UserProvider, UserContext }