import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import ResultView from './ResultView'
import ActicityIndicatorView from './ActivityIndicatorView'
import { asyncAxiosPost } from '../../../API/Database'


import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class CreateRoomView extends React.Component {

    state = {
        roomName: null,
        resultSucces: false,
        resultMessage: '',
        showResultView: false,
        showActicityIndicator: false
    }

    createNewRoom() {
        const numberOfPictures = 4
        const user = this.props.context
        this.setState({ showActicityIndicator: true })
        let randomPictureNumber = Math.floor(Math.random() * numberOfPictures)

        let newRoom = {
            numberOfPictures: randomPictureNumber,
            roomName: this.state.roomName
        }


        user.checkIfConnected()
            .then(() => {
                asyncAxiosPost('addRoomLink', 'CreateRoomView', newRoom, user.userToken)
                    .then(() => {
                        this.state.resultSucces = true
                        this.state.resultMessage = 'Raum wurde erstellt'
                        this.state.showActicityIndicator = false
                        this.setState({ showResultView: true })
                    })
                    .catch(() => {
                        this.state.resultSucces = false
                        this.state.resultMessage = 'Probleme mit dem Server'
                        this.state.showActicityIndicator = false
                        this.setState({ showResultView: true })
                        console.log('Fehler beim erstellen des Raumes')
                    })

            }).catch(() => {
                this.state.resultSucces = false
                this.state.resultMessage = 'Netzwerkfehler'
                this.state.showActicityIndicator = false
                this.setState({ showResultView: true })
            })
    }


    render() {
        const { showResultView, showActicityIndicator, resultMessage, resultSucces } = this.state
        return (
            <View style={styles.window}>
                {
                    showResultView ?
                        <ResultView resultSucces={resultSucces} resultMessage={resultMessage} />
                        :
                        <View style={styles.window}>
                            {showActicityIndicator ?
                                <ActicityIndicatorView />
                                :
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
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.saveButton} onPress={() => this.createNewRoom()}>
                                            <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Erstellen</Text>
                                        </TouchableOpacity>
                                    </View >
                                </View>}
                        </View>
                }
            </View>
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