import React, { useState, useContext } from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import logo from '../../assets/Logo.png'
import axios from 'axios';
import { UserContext } from './UserProvider';

import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';




const { width: WidTH } = Dimensions.get('window')

export default function RegistrationScreen({ navigation }) {

    const { login, setUserToken, setUserImage, setNickName, setEmail } = useContext(UserContext)

    const [username, setUsername] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [password2, setPassword2] = useState(null)
    const [emailThis, setEmailThis] = useState(null)
    const [fullName, setFullname] = useState(null)

    function _regNewAcc() {

        _checkValidityOfAllValues()
            .then(() => {
                axios.post('https://cue-cards-app.herokuapp.com/api/register', {
                    username: username,
                    password: password1,
                    email: emailThis,
                    fullName: fullName
                })
                    .then((res) => {

                        setUserToken(res.data.jwt)
                        setEmail(res.data.userData.email)
                        setNickName(res.data.userData.nickName)
                        setUserImage(res.data.userData.userImage)

                        console.log("Registrierung erfolgreich")
                        login()

                    }).catch((error) => {

                        //if (.status === 406) {
                        //     alert('Email bereits vorhanden')
                        // } else if (res.status === 409) {
                        //     alert('Username bereits vorhanden')
                        // } else if( === 500) {
                        //     alert('Verbindung fehlgeschlagen, bitte versuches es erneut')
                        // }
                        console.log("Registrierung fehlgeschlagen " + error)
                    })
            })
    }


    function _comparePasswords() {
        return new Promise((resolve, reject) => {
            if (password1 === password2) {
                resolve()
            } else {
                reject('Passwörter stimmen nicht überein')
            }
        })
    }

    function _checkIfNull(value) {
        return new Promise((resolve, reject) => {
            if (value != null) {
                resolve(value)
            } else {
                reject(value)
            }
        })
    }


    function checkEmailValidity() {

        return new Promise((resolve, reject) => {
            if (emailThis.includes('@')) {
                let splitedEmail = emailThis.split('@')
                if (splitedEmail.length === 2) {
                    if (splitedEmail[0].toString().length >= 2 && splitedEmail[1].toString().length >= 2) {
                        resolve()
                    } else {
                        reject('Muss mehr Zeichen enthalten')
                    }
                } else {
                    reject('zu kurz')
                }
            } else {
                reject('Enthält kein "@"')
            }
        })
    }

    function _checkValidityOfAllValues() {

        return new Promise((resolve, reject) => {

            _checkIfNull(username).then(() => {
                _checkIfNull(password1).then(() => {
                    _checkIfNull(password2).then(() => {
                        _comparePasswords().then(() => {
                            _checkIfNull(emailThis).then(() => {
                                checkEmailValidity().then(() => {
                                    _checkIfNull(fullName).then(() => {

                                        resolve()

                                    }).catch(error => {
                                        reject()
                                        alert('Nickname ungültig')
                                        console.log('FullName ungültig: ' + error)
                                    })
                                }).catch(error => {
                                    reject()
                                    alert('Email ungültig')
                                    console.log('Email ungültig: ' + error)
                                })
                            }).catch(error => {
                                reject()
                                alert('Email ungültig')
                                console.log('Email ungültig: ' + error)
                            })
                        }).catch(() => {
                            reject()
                            alert('Passwörter stimmen nicht überein')
                            console.log('Passwörter stimmen nicht überein')
                        })
                    }).catch(error => {
                        reject()
                        alert('Password 2 ungültig')
                        console.log('Password 2 ungültig: ' + error)
                    })
                }).catch(error => {
                    reject()
                    alert('Password 1 ungültig')
                    console.log('Password 1 ungültig: ' + error)
                })
            }).catch(error => {
                reject()
                alert('Username ungültig')
                console.log('Username ungültig: ' + error)
            })

        })
    }



    return (
        <ImageBackground
            source={require('../../assets/LoginHintergrund.png')}
            style={styles.container}
        >
            {/* <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="ios-arrow-back" size={25} color="white" />
            </TouchableOpacity> */}
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : ""}
            >
                <ScrollView>
                    <Image source={logo} style={styles.logo} />

                    <TextInput
                        style={styles.input}
                        placeholder={'Benutzername'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Nickname'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => setFullname(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'E-Mail'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Passwort'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        onChangeText={text => setPassword1(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Passwort wiederholen'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        onChangeText={text => setPassword2(text)}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => _regNewAcc()}
                    >
                        <Text style={styles.text}>Registrieren</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        alignSelf: 'center',
        width: 250,
        height: 100,
        marginTop: '25%'

    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20
    },
    input: {
        width: WidTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: '#2f3136',
        marginHorizontal: 25,
        marginVertical: 10,
        paddingLeft: 10,
        color: 'white',
        opacity: 0.7

    },
    button: {
        borderWidth: 0.7,
        borderColor: '#008FD3',
        height: 40,
        width: 130,
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 7,
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontStyle: "italic"
    }
})