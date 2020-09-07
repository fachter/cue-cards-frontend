import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native'
import ResultView from './ResultView'
import ActicityIndicatorView from './ActivityIndicatorView'
import { asyncAxiosPost } from '../../../API/Database'
import { UserContext } from '../../LoginRegistrationScreen/UserProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class CreateRoomView extends React.Component {

    static contextType = UserContext
    state = {
        roomName: null,
        passwordToggle: false,
        password: null,
        resultSucces: false,
        resultMessage: '',
        showResultView: false,
        showActivityIndicator: false
    }



    toggleSwitch() {
        this.setState({ passwordToggle: !this.state.passwordToggle })
    }

    checkPasswordValidity(password) {
        if (password.length >= 6 && password != null) {
            return true
        }
        return false
    }


    sendRoomToServer(newRoom) {
        const user = this.context
        console.log(newRoom)
        user.checkIfConnected()
            .then(() => {
                asyncAxiosPost('https://cue-cards-app.herokuapp.com/api/room', 'CreateRoomView', { newRoom }, user.userToken)
                    .then(() => {
                        this.state.resultSucces = true
                        this.state.resultMessage = 'Raum wurde erstellt'
                        this.state.showActivityIndicator = false
                        this.setState({ showResultView: true })
                    })
                    .catch(() => {
                        this.state.resultSucces = false
                        this.state.resultMessage = 'Probleme mit dem Server'
                        this.state.showActivityIndicator = false
                        this.setState({ showResultView: true })
                        console.log('Fehler beim erstellen des Raumes')
                    })

            }).catch(() => {
                this.state.resultSucces = false
                this.state.resultMessage = 'Netzwerkfehler'
                this.state.showActivityIndicator = false
                this.setState({ showResultView: true })
            })

    }


    createNewRoom() {
        const numberOfPictures = 4
        const { password, roomName, passwordToggle } = this.state
        this.setState({ showActicityIndicator: true })
        let randomPictureNumber = Math.floor(Math.random() * numberOfPictures)

        let newRoom = {
            pictureNumber: randomPictureNumber,
            name: roomName,
            password: password
        }


        if (passwordToggle === true) {
            if (this.checkPasswordValidity(password) === true) {
                if (roomName != null) {
                    this.sendRoomToServer(newRoom)
                } else {
                    alert("Geb deinen Raum einen Namen")

                }
            } else {
                alert("Dein Password muss mindestens sechs Zeichen enthalten")
            }
        } else {
            if (roomName != null) {
                this.sendRoomToServer(newRoom)
            } else {
                alert("Geb deinen Raum einen Namen")
            }
        }

    }


    renderWindow() {
        const { showResultView, resultMessage, resultSucces, passwordToggle } = this.state

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
                        onChangeText={text => this.setState({ roomName: text })}>
                    </TextInput>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white' }}>Password hinzufügen</Text>
                            <Switch
                                style={{ alignSelf: 'center' }}
                                trackColor={{
                                    false: "grey", true: "grey"
                                }}
                                thumbColor='#008FD3'
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.toggleSwitch()}
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
                                    onChangeText={text => this.setState({ password: text })}>
                                </TextInput>
                                : null
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={() => this.createNewRoom()}>
                            <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Erstellen</Text>
                        </TouchableOpacity>
                    </View >
                </View>
            )
        } else {
            return (
                <ResultView resultMessage={resultMessage} resultSucces={resultSucces} />
            )
        }
    }


    render() {
        return (
            <View>{this.renderWindow()}</View>
        )
    }
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
        width: '85%',
        borderRadius: 5,
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: '#202225',
        padding: 10,
        margin: 5,

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