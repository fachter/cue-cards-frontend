import React, { useContext, useEffect, useState } from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, Switch, StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import { UserContext } from './UserProvider'
import { SettingsContext } from '../SettingsScreen/SettingsProvider'
import logo from '../../assets/Logo.png';
import LoginHintergrund from '../../assets/LoginHintergrund.png';





const { width: WidTH } = Dimensions.get('window')

export default function LoginScreen({ navigation }) {

    const { checkIfUserStayedLoggedin, _authenticateAcc, login, saveUserOnDevice } = useContext(UserContext)
    const { retrieveSettignsfromDevice } = useContext(SettingsContext)
    const [username, setUnsername] = useState('')
    const [password, setPassword] = useState('')
    const [stayLoggedin, setStayLoggedin] = useState(false)
    const [screenIsMounted, setScreenIsMounted] = useState(false)


    useEffect(() => {
        if (screenIsMounted === false) {
            checkIfUserStayedLoggedin()
                .then(userData => {
                    setStayLoggedin(true)
                    userLogin(userData.stayLoggedin, userData.username, userData.password)
                    console.log("Logindaten wurden zuvor gespeichert. Login erfolgreich")
                })
            setScreenIsMounted(true)
        }
    })

    function toggleSwitch() {

        if (stayLoggedin === true) {
            saveUserOnDevice(false, null, null)
        }

        setStayLoggedin(!stayLoggedin)
    }



    function userLogin(loginstate, user, pw) {
        _authenticateAcc(loginstate, user, pw)
            .then(async (res) => {
                if (stayLoggedin === true) {
                    saveUserOnDevice(true, pw, user)
                }
                await retrieveSettignsfromDevice()
                login()

                console.log("Authentifizierung erfolgreich")
            }).catch(errorstatus => {
                if (errorstatus === 400) {
                    alert('Benutzername und Passwort stimmen nicht überein')
                } else if (errorstatus === 500) {
                    alert('Verbindung fehlgeschlagen, bitte versuches es erneut')
                }
                console.log('Authentifizierung fehlgeschlagen ' + errorstatus)
            })
    }


    return (
        <ImageBackground
            source={require('../../assets/LoginHintergrund.png')}
            style={styles.container}
        >
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
                        onChangeText={text => setUnsername(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Passwort'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 7 }}>
                        <Switch
                            style={{ alignSelf: 'center' }}
                            trackColor={{
                                false: "grey", true: "#008FD3"
                            }}
                            thumbColor='#008FD3'
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch()}
                            value={stayLoggedin}
                        />
                        <Text style={{ color: 'white', marginLeft: 5 }}>eingeloggt bleiben</Text>
                    </View>
                    <View style={styles.knöpfe}>
                        <TouchableOpacity style={styles.button} onPress={() => userLogin(stayLoggedin, username, password)}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registration')}>
                            <Text style={styles.text}>Registrieren</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )

}




const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    logo: {
        width: 300,
        height: 120,
        marginBottom: 30,
        alignSelf: 'center',
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
        marginVertical: 20,
        marginHorizontal: 7



    },
    text: {
        color: 'white',
        fontSize: 17,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    knöpfe: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,

    },

})