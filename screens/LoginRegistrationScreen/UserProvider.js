import React from 'react'
import { AsyncStorage } from 'react-native'
import { ListStructureContext, ListStructureProvider } from '../HomeScreen/ListStructureProvider'
import axios from 'axios';


const UserContext = React.createContext()

export default class UserProvider extends React.Component {
    static contextType = ListStructureContext

    constructor(props) {
        super(props)

        this._authenticateAcc = this._authenticateAcc.bind(this)
        this.setUserToken = this.setUserToken.bind(this)

        this.state = {
            isLoggedin: true,
            userToken: null,
        }

    }

    static getUserToken() {
        return this.state.userToken
    }

    // async _storeTokenOnDevice(token) {
    //     try {
    //         await AsyncStorage.setItem(
    //             'userToken', token
    //         );
    //     } catch (error) {
    //         console.log("Fehler beim speichern des Tokens: " + error)
    //     }
    // }

    // async retrievetTokenFromDevice() {
    //     try {
    //         const token = await AsyncStorage.getItem('userToken')
    //         console.log(token)
    //         if (token != null) {
    //             return token
    //         }
    //     } catch (error) {
    //         console.log("Error by retrieve token:" + error)
    //     }
    // }


    login = () => {
        this.setState({ isLoggedin: true })
    }

    logout = () => {
        this.setState({ isLoggedin: false })
        this.saveUserOnDevice(false, '', '')
        console.log("")
    }

    setUserToken(token) {
        this.setState({ userToken: token })
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
                        console.log("Nutzerdaten sind für Login gespeichert worden ... logge ein..")
                        resolve(true)
                    }
                }
            } catch (error) {
                console.log("Es wurden keine Daten für Login gespeichert, einloggen notwendig.")
                reject(false)
            }
        })
    }


    _authenticateAcc(stayLoggedin, username, password) {
        const user = new UserProvider

        return new Promise((resolve, reject) => {
            axios.post('https://cue-cards-app.herokuapp.com/authenticate', {
                username: 'xx',
                password: 'xx',
            })
                .then((res) => {
                    console.log("Authentifizierung erfolgreich")
                    this.setState({ userToken: res.data.jwt })
                    axios.get("https://cue-cards-app.herokuapp.com/get-users-data", {
                        headers: {
                            'Authorization': "Bearer " + res.data.jwt
                        }
                    }).then(resp => {
                        console.log("Laden der Nutzerdaten erfolgreich")
                        if (stayLoggedin === true) {
                            user.saveUserOnDevice(stayLoggedin, username, password)
                        }

                        resolve(resp.data)
                    })
                        .catch((err) => {
                            reject()
                            console.log("Laden der Nutzerdaten fehlgeschlagen " + err)
                        })
                }).catch(err => {
                    console.log("Authentifizierung fehlgeschlagen: " + err)
                })
        })
    }


    async loadingDataAndSettings() {

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
                userToken: this.state.userToken,
                setUserToken: this.setUserToken,
                logout: this.logout,
                login: this.login,
                _storeTokenOnDevice: this._storeTokenOnDevice,
                saveUserOnDevice: this.saveUserOnDevice,
                checkIfUserStayedLoggedin: this.checkIfUserStayedLoggedin,
                _authenticateAcc: this._authenticateAcc,
                retrievetTokenFromDevice: this.retrievetTokenFromDevice,

            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}


export { UserProvider, UserContext }