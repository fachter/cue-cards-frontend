import React, { useContext, useEffect, useState } from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, Switch, StyleSheet } from 'react-native';
import { UserContext } from './UserProvider'
import { SettingsContext } from '../SettingsScreen/SettingsProvider'
import logo from '../../assets/Logo.png';





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
                .then(res => {
                    setStayLoggedin(true)
                    saveUserOnDevice(true, password, username)
                    userLogin()
                    console.log("Logindaten wurden zuvor gespeichert. Login " + res)
                })
            setScreenIsMounted(true)
        }
    })

    function toggleSwitch() {
        setStayLoggedin(!stayLoggedin)

    }


    function userLogin() {
        _authenticateAcc(stayLoggedin, username, password)
            .then(res => {
                login()
                retrieveSettignsfromDevice()
                console.log("Authentifizierung " + res)
            }).catch(err => {
                console.log('Authentifizierung ' + err)

            })
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
                    onChangeText={text => setUnsername(text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={'Passwort'}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
            <TouchableOpacity style={[styles.button, { marginTop: 30 }]} onPress={() => userLogin()}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.text}>Registrieren</Text>
            </TouchableOpacity>
        </View>
    )

}




const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#111111',
        paddingTop: 25
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 50,
        alignSelf: 'center'
    },
    input: {
        width: WidTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: 'black',
        marginHorizontal: 25,
        marginVertical: 10,
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
        alignSelf: 'center',


    },
    text: {
        color: 'black',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    },

})