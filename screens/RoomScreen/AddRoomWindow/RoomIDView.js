import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Axios from 'axios'
import ResultView from './ResultView'
import PasswordView from './PasswordView'
import ActicityIndicatorView from './ActivityIndicatorView'
import { UserContext } from '../../LoginRegistrationScreen/UserProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function RoomIDView({ updateRooms, onSetVisibility }) {


    const [componentIsMounted, setComponentIsMounted] = useState(false)
    const [showPasswordView, setShowPasswordView] = useState(false)
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    const [showResultView, setShowResultView] = useState(false)
    const resultSucces = useRef(false)
    const resultMessage = useRef('')
    const roomID = useRef(null)

    const { userToken, checkIfConnected, isConnected } = useContext(UserContext)



    useEffect(() => {
        if (componentIsMounted === false) {
            checkIfConnected()
            setComponentIsMounted(true)
        }
    })




    const askingForRoom = () => {
        //this.setState({ showActivityIndicator: true })
        Axios.get(`https://cue-cards-app.herokuapp.com/api/join-room/${roomID.current}`, {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                //showActivityIndicator.current = false
                updateRooms()
                onSetVisibility(false)
                console.log(`Beitreten des Raumes mit der ID ${roomID.urrent} ` + res)
            } else if (res.status === 202) {
                setShowPasswordView(true)
            }
        }).catch(err => {
            resultSucces.current = false
            resultMessage.current = `Betreten des Raumes ${roomID.current} fehlgeschlagen`
            //this.state.showActivityIndicator = false
            setShowResultView(true)
            console.log(`Beitreten des Raumes mit der ID ${roomID.current} felgeschlagen ` + err)

        })
    }

    const renderWindow = () => {

        if (componentIsMounted === true) {
            if (showResultView === false) {
                if (showPasswordView === false) {
                    return (
                        <View style={styles.window}>
                            {isConnected ?
                                <View style={styles.window}>
                                    <Text
                                        style={styles.headingText}>Gib die ID des Raumes ein</Text>
                                    <TextInput
                                        style={styles.friendName}
                                        placeholder="z.B. 12"
                                        placeholderTextColor="grey"
                                        onChangeText={text => roomID.current = text}>
                                    </TextInput>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.saveButton} onPress={() => askingForRoom()}>
                                            <MaterialCommunityIcons name="home-import-outline" size={20} color="white" />
                                            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                                        </TouchableOpacity>
                                    </View >
                                </View>
                                :
                                <View>
                                    <Text>Prüfe deine Internetverbindung</Text>
                                </View>}

                        </View>
                    )
                } else {
                    if (showActivityIndicator === false) {
                        return (
                            <PasswordView roomID={roomID.current} userToken={userToken} updateRooms={updateRooms} onSetVisibility={onSetVisibility} />
                        )
                    } else {
                        return (
                            <ActicityIndicatorView />
                        )
                    }
                }

            } else {
                return (
                    <ResultView resultMessage={resultMessage.current} resultSucces={resultSucces.current} />
                )
            }
        } else {
            return (
                <View>
                    <Text>Test</Text>
                </View>
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
        alignItems: 'center',

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
        marginVertical: 40,
        marginHorizontal: 7
    },
    buttonContainer: {
        flexDirection: 'row'
    },
});