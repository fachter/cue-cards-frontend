import React, { useState, useContext } from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import logo from '../../assets/Logo.png'
import axios from 'axios';
import { UserContext } from './UserProvider';
import { ScrollView } from 'react-native-gesture-handler';




const { width: WidTH } = Dimensions.get('window')

export default function RegistrationScreen({ navigation }) {

    const { login, setUserToken } = useContext(UserContext)

    const [username, setUsername] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [password2, setPassword2] = useState(null)
    const [email, setEmail] = useState(null)
    const [fullName, setFullname] = useState(null)



    function _regNewAcc() {
        axios.post('https://cue-cards-app.herokuapp.com/api/register', {
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
            <ScrollView >
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
                        placeholder={'Nickname'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        onChangeText={text => setFullname(text)}
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


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => _regNewAcc()}
                >
                    <Text style={styles.text}>Registrieren</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#202225',
    },
    logo: {
        alignSelf: 'center',
        width: 250,
        height: 100,
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
        color: 'white'

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
        marginHorizontal: 7
    },
    text: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontStyle: "italic"
    }
})