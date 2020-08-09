import React from 'react'
import { AsyncStorage } from 'react-native'
import { ListStructureContext, ListStructureProvider } from '../HomeScreen/ListStructureProvider'
import { SettingsProvider } from '../SettingsScreen/SettingsProvider'
import axios from 'axios';


const UserContext = React.createContext()

export default class UserProvider extends React.Component {

    static contextType = ListStructureContext

    state = {
        isLoggedin: true,
    }


    async _storeTokenOnDevice(token) {
        try {
            await AsyncStorage.setItem(
                'userToken', token
            );
        } catch (error) {
            console.log("Fehler beim speichern des Tokens: " + error)
        }
    }

    async retrievetTokenFromDevice() {
        try {
            const token = await AsyncStorage.getItem('userToken')
            if (token != null) {
                return token
            }
        } catch (error) {
            console.log("Error by retrieve token:" + error)
        }
    }


    login = () => {
        this.setState({ isLoggedin: true })
    }

    logout = () => {
        this.setState({ isLoggedin: false })

        this.saveUserOnDevice(false, '', '')
    }

    setDataIsLoading(value) {
        this.setState({ dataIsLoading: value })
    }

    saveUserOnDevice = async (boolean, username, password) => {
        try {
            await AsyncStorage.setItem(
                'loginData',
                JSON.stringify({
                    stayLoggedin: boolean,
                    username: username,
                    password: password
                })
            );
        } catch (error) {
            console.log(error)
        }
    }


    checkIfUserStayedLoggedin() {
        return new Promise(async (resolve, reject) => {
            try {
                const loginData = await AsyncStorage.getItem('loginData')
                if (loginData != null) {
                    let data = JSON.parse(loginData)
                    if (data.stayLoggedin === true) {
                        console.log("Nutzerdaten sind gespeichert worden und werden genutzt.")
                        resolve(true)
                    }
                }
            } catch (error) {
                console.log("Nutzerdaten sind nicht gespeichert worden, bitte einloggen.")
                reject(false)
            }
        })
    }


    _authenticateAcc(stayLoggedin, username, password) {
        const user = new UserProvider

        return new Promise((resolve, reject) => {
            axios.post('https://cue-cards-app.herokuapp.com/authenticate', {
                username: 'username',
                password: 'password',
            })
                .then((res) => {
                    user._storeTokenOnDevice(res.data.jwt)
                    axios.get("https://cue-cards-app.herokuapp.com/get-users-data", {
                        headers: {
                            'Authorization': "Bearer " + res.data.jwt
                        }
                    }).then(resp => {
                        if (stayLoggedin === true) {
                            user.saveUserOnDevice(stayLoggedin, username, password)
                        }

                        console.log("Verbindung mit der Datenbank erfolgreich. Daten: ")
                        console.log(resp.data)
                        resolve(resp.data)
                    })
                        .catch((err) => {
                            reject()
                            console.log("Login fehlgeschlagen, keine Verbindung zur Datenbank möglich: " + err)
                        })
                })
        })
    }


    async loadingDataAndSettings() {

        const dataList = this.context

        return new Promise(async (resolve, reject) => {
            let response = await ListStructureProvider.retrieveDataFromDevice()
            if (response === true) {
                resolve()
            } else {
                reject()
            }
        }).catch(error => console.log(error))



    }


    render() {
        return (
            <UserContext.Provider value={{
                isLoggedin: this.state.isLoggedin,

                logout: this.logout,
                login: this.login,
                _storeTokenOnDevice: this._storeTokenOnDevice,
                saveUserOnDevice: this.saveUserOnDevice,
                checkIfUserStayedLoggedin: this.checkIfUserStayedLoggedin,
                _authenticateAcc: this._authenticateAcc,
                retrievetTokenFromDevice: this.retrievetTokenFromDevice
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}


export { UserProvider, UserContext }