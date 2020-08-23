import React, { useState, useContext } from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import logo from '../../assets/Logo.png'
import axios from 'axios';
import { UserContext } from './UserProvider';




const { width: WidTH } = Dimensions.get('window')

export default function RegistrationScreen({ navigation }) {

    const { login, setUserToken } = useContext(UserContext)

    const [username, setUsername] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [password2, setPassword2] = useState(null)
    const [email, setEmail] = useState(null)
    const [fullName, setFullname] = useState(null)



    function _regNewAcc() {
        axios.post('https://cue-cards-app.herokuapp.com/register', {
            username: 'xx',
            password: 'xx',
            email: 'xx@bla.de',
            fullName: 'xx'
        })
            .then((resp) => {
                console.log(resp.data.jwt)
                setUserToken(resp.data.jwt)
                login()
            }).catch((error) => {
                console.log(error)
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

    function _checkValidityOfAllValues() {
        _checkIfNull(username).then(() => {
            _checkIfNull(password1).then(() => {
                _checkIfNull(password2).then(() => {
                    _comparePasswords().then(() => {
                        _checkIfNull(email).then(() => {
                            _checkIfNull(firstName).then(() => {
                                _checkIfNull(lastName).then(() => {
                                    this.props.navigation.navigate('Login')

                                }).catch(error => console.log('Lastname ungültig: ' + error))
                            }).catch(error => console.log('Firstname ungültig: ' + error))
                        }).catch(error => console.log('Email ungültig: ' + error))
                    }).catch(() => console.log('Passwörter stimmen nicht überein'))
                }).catch(error => console.log('Password 2 ungültig: ' + error))
            }).catch(error => console.log('Password 1 ungültig: ' + error))
        }).catch(error => console.log('Username ungültig: ' + error))
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={'Benutzername'}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={text => setUsername(text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={'Passwort'}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword1(text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={'Passwort wiederholen'}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword2(text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={'E-Mail'}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={'Profilname'}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    onChangeText={text => setFullname(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => _regNewAcc()}
            >
                <Text style={styles.text}>Registrieren</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#111111',
        paddingTop: 25
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 50
    },
    input: {
        width: WidTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: 'black',
        marginHorizontal: 25,
        marginVertical: 15,
        paddingLeft: 10,
        color: 'white'

    },
    button: {
        width: 100,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    text: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    }
})