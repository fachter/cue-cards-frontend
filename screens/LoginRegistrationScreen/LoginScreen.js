import React, { useContext, useEffect, useState } from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, Button, FlatList, StyleSheet, CheckBox } from 'react-native';
import { UserContext } from './UserProvider'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { SettingsContext } from '../SettingsScreen/SettingsProvider'
import { InternetConnectionContext } from '../../API/InternetConnection'
import logo from '../../assets/Logo.png';





const { width: WidTH } = Dimensions.get('window')

export default function LoginScreen({ navigation }) {

    const { checkIfUserStayedLoggedin, _authenticateAcc, login } = useContext(UserContext)
    const { setCurrentListStructure, retrieveDataFromDevice } = useContext(ListStructureContext)
    const { retrieveSettignsfromDevice } = useContext(SettingsContext)
    const { isConnected } = useContext(InternetConnectionContext)
    const [username, setUnsername] = useState('')
    const [password, setPassword] = useState('')
    const [stayLoggedin, setStayLoggedin] = useState(false)
    const [screenIsMounted, setScreenIsMouted] = useState(false)


    useEffect(() => {

        if (screenIsMounted === false) {
            checkIfUserStayedLoggedin().then(savedLoginState => {
                userLogin(savedLoginState)
                setScreenIsMouted(true)
            })
        }
    })


    async function userLogin(savedLoginState) {

        var deviceData = await retrieveDataFromDevice()

        _authenticateAcc(stayLoggedin, username, password).then(async (data) => {

            let networkData = data.folders

            // //prüft ob die Daten auf dem Gerät oder aus dem Netz aktuell sind und läd diese dementsprechend
            // if (deviceData.date < networkData.date) {
            //     setCurrentListStructure(data.folders)
            // } else {
            //     setCurrentListStructure(deviceData)
            // }

            retrieveSettignsfromDevice()
            setCurrentListStructure(data.folders)

        }).then(() => {
            login()

        }).catch(() => {
            if (savedLoginState === true) {
                console.log("Verbindung zur Datenbank fehlgeschlagen, logge ein mit Lokalen daten")
                retrieveSettignsfromDevice()
                setCurrentListStructure(deviceData)
                login()
            }

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
                <CheckBox
                    value={stayLoggedin}
                    onValueChange={value => setStayLoggedin(value)}
                    style={styles.checkbox}
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
    checkbox: {

    }
})