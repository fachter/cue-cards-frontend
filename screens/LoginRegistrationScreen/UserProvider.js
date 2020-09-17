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
        this.setUserImage = this.setUserImage.bind(this)
        this.setUserName = this.setUserName.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)

        this.state = {
            username: null,
            nickName: '###',
            email: '###',
            userImage: 'https://image.shutterstock.com/z/stock-vector-empty-background-in-the-style-of-png-blank-background-676832590.jpg',
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
            NetInfo.fetch().
                then((response) => {
                    if (response.isConnected === true) {
                        resolve('erfolgreich')
                    }
                    else {
                        reject('fehlgeschlagen')
                    }

                    if (this.state.isConnected != response.isConnected) {
                        this.setState({ isConnected: response.isConnected })
                    }
                })
                .catch(error => {
                    reject('fehlgeschlagen')
                    console.log("Verbindung zum Netzwerk nicht möglich =>  " + error)
                })
        })
    }




    login = () => {
        this.setState({ isLoggedin: true })
    }

    logout = () => {
        this.state.stayLoggedin = false
        this.state.username = false
        this.state.password = false
        this.saveUserOnDevice(false, '', '')
        this.setState({ isLoggedin: false })
    }

    setUserToken(token) {
        this.setState({ userToken: token })
    }

    setDataIsLoading(value) {
        this.setState({ dataIsLoading: value })
    }


    setUserName(username) {
        this.setState({ username })
    }

    setPassword(password) {
        this.setState({ password })
    }

    setUserImage(url) {
        this.setState({ userImage: url })
    }

    setEmail(email) {
        this.setState({ email })
    }

    setNickName(nickName) {
        this.setState({ nickName })
    }

    saveUserOnDevice = (stayLoggedin, password, username) => {
        try {
            AsyncStorage.setItem(
                'loginData',
                JSON.stringify({
                    stayLoggedin: stayLoggedin,
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
                        resolve(data)
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
            axios.post('https://cue-cards-app.herokuapp.com/api/authenticate', {
                username: username,
                password: password,
            }).then(res => {
                this.state.userToken = res.data.jwt
                this.state.email = res.data.email
                this.state.userImage = res.data.userImage
                this.state.nickName = res.data.nickName
                this.state.username = username
                resolve('erfolgreich')
                if (stayLoggedin === true) {
                    user.saveUserOnDevice(stayLoggedin, username, password)
                }
            }).catch((err) => {
                reject('fehlgeschlagen' + err)
            })
        })
    }



    render() {
        return (
            <UserContext.Provider value={{
                username: this.state.username,
                setUserName: this.setUserName,
                nickName: this.state.nickName,
                setNickName: this.state.nickName,
                email: this.state.email,
                setEmail: this.setEmail,
                userImage: this.state.userImage,
                setUserImage: this.setUserImage,
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