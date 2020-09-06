import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ResultView from './ResultView'
import PasswordView from './PasswordView'
import ActicityIndicatorView from './ActivityIndicatorView'



export default class RoomIDView extends React.Component {

    state = {
        roomID: null,
        showPasswordView: false,
        showActivityIndicator: false,
        showResultView: false,
        resultSucces: false,
        resultMessage: '',
    }

    askingForRoom(roomID) {
        this.setState({ showActivityIndicator: true })
        const user = this.context

        return new Promise((resolve, reject) => {
            Axios.post(`https://cue-cards-app.herokuapp.com/api/authenticate/join-room/${roomID}`, {
                headers: {
                    'Authorization': "Bearer " + user.userToken
                }
            }).then(res => {
                //console.log(res)
                if (res.status === 200) {
                    resolve()
                    console.log(`Beitreten des Raumes mit der ID ${roomID} ` + res)
                    this.state.resultSucces = true
                    this.state.resultMessage = `Du bist dem Raum erfolgreich beigetreten`
                    this.state.showActivityIndicator = false
                    this.setState({ showResultView: true })

                } else if (res.status === 202) {
                    this.setState({ showPasswordView: true })
                }
            }).catch(err => {
                this.state.resultSucces = false
                this.state.resultMessage = `Betreten des Raumes ${roomID} fehlgeschlagen`
                this.state.showActivityIndicator = false
                this.setState({ showResultView: true })
                console.log(`Beitreten des Raumes mit der ID ${roomID} felgeschlagen ` + err)
                reject()

            })
        })
    }

    renderWindow() {
        const { showPasswordView, showActivityIndicator, showResultView, resultSucces, resultMessage, result } = this.state

        if (showResultView === false) {
            if (showPasswordView === false) {
                return (
                    <View style={styles.window}>
                        {this.props.internetConnection ?
                            <View style={styles.window}>
                                <Text
                                    style={styles.headingText}>Geb die ID des Raumes ein</Text>
                                <TextInput
                                    style={styles.friendName}
                                    placeholder="z.B. {Beispiel nach ID anpassen}"
                                    placeholderTextColor="grey"
                                    onChangeText={text => this.setState({ roomID: text })}>
                                </TextInput>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.saveButton} onPress={() => this.askingForRoom(this.state.roomID)}>
                                        <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
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
                        <PasswordView />
                    )
                } else {
                    return (
                        <ActicityIndicatorView />
                    )
                }
            }

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
        width: '100%',
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