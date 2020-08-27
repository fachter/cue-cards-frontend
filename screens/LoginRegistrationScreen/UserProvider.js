import React from 'react'
import { AsyncStorage } from 'react-native'
import axios from 'axios';
// import { connect } from 'react-redux'
// import { updateUserToken } from '../../API/redux/actions/user';
import NetInfo from "@react-native-community/netinfo";


const UserContext = React.createContext()

class UserProvider extends React.Component {
    constructor(props) {
        super(props)

        this._authenticateAcc = this._authenticateAcc.bind(this)
        this.setUserToken = this.setUserToken.bind(this)
        this.checkIfConnected = this.checkIfConnected.bind(this)

        this.state = {
            isLoggedin: false,
            userToken: null,
            isConnected: false,
        }
    }

    static getUserToken() {
        return this.state.userToken
    }


    checkIfConnected() {
        return new Promise((resolve, reject) => {
            NetInfo.fetch().then((response) => {
                if (response.isConnected === true) {
                    resolve('erfolgreich')
                }
                else {
                    reject('fehlgeschlagen')
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
                        resolve('erfolgreich')
                    }
                }
            } catch (error) {
                console.log("Es wurden keine Daten für Login gespeichert, einloggen notwendig.")
                reject('fehlgeschlagen ' + error)
            }
        })
    }


    _authenticateAcc(stayLoggedin, username, password) {


        return new Promise((resolve, reject) => {
            axios.post('https://cue-cards-app.herokuapp.com/authenticate', {
                username: 'xx',
                password: 'xx',
            }).then(res => {
                this.setState({ userToken: res.data.jwt })
                resolve('erfolgreich')
                if (stayLoggedin === true) {
                    user.saveUserOnDevice(stayLoggedin, username, password)
                }
            }).catch((err) => {
                reject('fehlgeschlagen' + err)
            })
        })
    }





    async loadingDataAndSettings() {
        // return new Promise(async (resolve, reject) => {
        //     let response = await ListStructureProvider.retrieveDataFromDevice()
        //     if (response === true) {
        //         resolve()
        //     } else {
        //         reject()
        //     }
        // }).catch(error => console.log(error))
    }


    render() {
        return (
            <UserContext.Provider value={{
                isConnected: this.state.isConnected,
                checkIfConnected: this.checkIfConnected,
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




const mapDispatchToProps = (dispatch) => {
    return {
        updateUserToken: () => dispatch(updateUserToken())
    }
}

export default UserProvider
export { UserContext }