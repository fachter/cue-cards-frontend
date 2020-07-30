import React from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import logo from '../../assets/Logo.png'
import axios from 'axios';




const { width: WIDTH } = Dimensions.get('window')

export default class RegistrationScreen extends React.Component {

    state = {
        username: null,
        password1: null,
        password2: null,
        email: null,
        firstName: null,
        lastName: null,
    }

    _regNewAcc() {

    }

    _comparePasswords() {
        const { password1, password2 } = this.state

        return new Promise((resolve, reject) => {
            if (password1 === password2) {
                resolve()
            } else {
                reject('Passwörter stimmen nicht überein')
            }
        })
    }

    _checkIfNull(value) {

        return new Promise((resolve, reject) => {
            if (value != null) {
                resolve(value)
            } else {
                reject(value)
            }
        })
    }


    _checkValidityOfAllValues() {
        const { username, password1, password2, email, firstName, lastName } = this.state

        this._checkIfNull(username).then(() => {
            this._checkIfNull(password1).then(() => {
                this._checkIfNull(password2).then(() => {
                    this._comparePasswords().then(() => {
                        this._checkIfNull(email).then(() => {
                            this._checkIfNull(firstName).then(() => {
                                this._checkIfNull(lastName).then(() => {

                                    this.props.navigation.navigate('Login')

                                }).catch(error => console.log('Lastname ungültig: ' + error))
                            }).catch(error => console.log('Firstname ungültig: ' + error))
                        }).catch(error => console.log('Email ungültig: ' + error))
                    }).catch(() => console.log('Passwörter stimmen nicht überein'))
                }).catch(error => console.log('Password 2 ungültig: ' + error))
            }).catch(error => console.log('Password 1 ungültig: ' + error))
        }).catch(error => console.log('Username ungültig: ' + error))
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={logo} style={styles.logo} />

                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Benutzername'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={text => this.setState({ username: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Passwort'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password1: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Passwort wiederholen'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password2: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'E-Mail'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ email: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Vorname'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ firstName: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Nachname'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ lastName: text })}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={() => this._regNewAcc()}
                    >
                        <Text style={styles.text}>Registrieren</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }
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
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: 'black',
        marginHorizontal: 25,
        marginVertical: 15,
        paddingLeft: 10,
        color: 'white'

    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginHorizontal: 25,
        marginBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    }
})