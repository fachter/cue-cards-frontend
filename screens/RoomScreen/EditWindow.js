import React from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ResultView from './AddRoomWindow/ResultView'
import ActicityIndicatorView from './AddRoomWindow/ActivityIndicatorView'
import { asyncAxiosPost } from '../../API/Database'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'


export default class DeleteRoomWindow extends React.Component {
    static contextType = UserContext

    state = {
        resultSucces: false,
        resultMessage: '',
        showResultView: false,
        showActicityIndicator: false
    }

    removeRoom() {
        const user = this.context
        this.setState({ showActicityIndicator: true })

        user.checkIfConnected()
            .then(() => {
                asyncAxiosPost('delteRoomlink', 'EditRoomWindow', 'id??', user.userToken)
                    .then(() => {
                        this.state.resultSucces = true
                        this.state.resultMessage = 'Raum wurde gelöscht'
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
        return (
            <Modal
                animationType="fade"
                transparent={true}>
                <View style={styles.background}>
                    <View style={styles.window}>
                        {showResultView ?
                            <ResultView resultSucces={this.state.resultSucces} resultMessage={this.state.resultMessage} />
                            :
                            <View>
                                {showActicityIndicator ?
                                    <ActicityIndicatorView />
                                    :
                                    <View>
                                        <TouchableOpacity style={styles.cancelButton} onPress={() => onSetVisibility()}>
                                            <AntDesign name="closecircleo" size={24} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => this.removeRoom(this.props.item)}>
                                            <Text style={styles.buttonText}>löschen</Text>
                                        </TouchableOpacity>
                                    </View >
                                }
                            </View>
                        }
                    </View>
                </View>
            </Modal>

        )
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.8

    },
    window: {
        flexDirection: 'column',
        width: '80%',
        height: '20%',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    buttonText: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10
    },
    cancelButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignSelf: 'flex-end',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }

});


