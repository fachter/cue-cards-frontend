import React, { useContext, useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native'
import ResultView from './ResultView'
import { asyncAxiosPost } from '../../../API/Database'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { UserContext } from '../../LoginRegistrationScreen/UserProvider'

export default function CreateRoomView({ updateRooms, onSetVisibility }) {

    const [roomName, setRoomName] = useState(null)
    const [passwordToggle, setPasswordToggle] = useState(false)
    const [password, setPassword] = useState(null)
    const [showResultView, setShowResultView] = useState(false)
    const resultSucces = useRef(false)
    const resultMessage = useRef('')


    const { userToken, checkIfConnected } = useContext(UserContext)

    function toggleSwitch() {
        setPasswordToggle(!passwordToggle)
    }

    function checkPasswordValidity() {
        if (password.length >= 6 && password != null) {
            return true
        }
        return false
    }



    function sendRoomToServer(newRoom) {
        checkIfConnected()
            .then(() => {
                asyncAxiosPost('https://cue-cards-app.herokuapp.com/api/room', 'CreateRoomView', newRoom, userToken)
                    .then(() => {
                        resultSucces.current = true
                        resultMessage.current = 'Raum wurde erstellt'
                        updateRooms()
                        onSetVisibility()
                    })
                    .catch(() => {
                        resultSucces.current = false
                        resultMessage.current = 'Probleme mit dem Server'
                        setShowResultView(true)
                        console.log('Fehler beim erstellen des Raumes')
                    })

            }).catch(() => {
                resultSucces.current = false
                resultMessage.current = 'Netzwerkfehler'
                setShowResultView(true)
            })

    }


    function createNewRoom() {
        const numberOfPictures = 4

        let randomPictureNumber = Math.floor(Math.random() * numberOfPictures)

        let newRoom = {
            pictureNumber: randomPictureNumber,
            name: roomName,
            password: password
        }


        if (passwordToggle === true) {
            if (checkPasswordValidity() === true) {
                if (roomName != null) {
                    sendRoomToServer(newRoom)
                } else {
                    alert("Geb deinen Raum einen Namen")
                }
            } else {
                alert("Dein Password muss mindestens sechs Zeichen enthalten")
            }
        } else {
            if (roomName != null) {
                sendRoomToServer(newRoom)
            } else {
                alert("Geb deinen Raum einen Namen")
            }
        }

    }


    function renderWindow() {


        if (showResultView === false) {
            return (
                <View style={styles.window}>
                    <Text
                        style={styles.headingText}>Gib deinem Raum einen Namen</Text>
                    <TextInput
                        style={styles.friendName}
                        maxLength={20}
                        placeholder="z.B. Lerngruppe1234"
                        placeholderTextColor="grey"
                        onChangeText={text => setRoomName(text)}>
                    </TextInput>
                    <View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text style={{ color: 'white', marginTop: 5, paddingRight: 5 }}>Password hinzufügen</Text>
                            <Switch
                                style={{ alignSelf: 'center' }}
                                trackColor={{
                                    false: "grey", true: "#008FD3"
                                }}
                                thumbColor='#008FD3'
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => toggleSwitch()}
                                value={passwordToggle}
                            />

                        </View  >
                        {
                            passwordToggle ?
                                <TextInput
                                    style={styles.friendName}
                                    maxLength={20}
                                    placeholder="Password"
                                    placeholderTextColor="grey"
                                    onChangeText={text => setPassword(text)}>
                                </TextInput>
                                : null
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={() => createNewRoom()}>
                            <MaterialCommunityIcons name="home-plus" size={20} color="white" />
                            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Erstellen</Text>
                        </TouchableOpacity>
                    </View >
                </View>
            )
        } else {
            return (
                <ResultView resultMessage={resultMessage.current} resultSucces={resultSucces.current} />
            )
        }
    }


    return (
        <View>{renderWindow()}</View>
    )

}

const styles = StyleSheet.create({
    window: {
        width: '100%',
        alignItems: 'center'

    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 20,
    },
    friendName: {
        width: 300,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: '#2f3136',
        marginHorizontal: 25,
        marginVertical: 10,
        paddingLeft: 10,
        color: 'white'

    },
    saveButton: {
        borderColor: '#008FD3',
        borderWidth: 1,
        flexDirection: 'row',
        height: 45,
        width: 140,
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginHorizontal: 7
    },
    buttonContainer: {
        flexDirection: 'row'
    },
});