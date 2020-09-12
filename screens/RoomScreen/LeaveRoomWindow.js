import React from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ResultView from './AddRoomWindow/ResultView'
import ActicityIndicatorView from './AddRoomWindow/ActivityIndicatorView'
import { asyncAxiosPost } from '../../API/Database'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'


export default class LeaveRoomWindow extends React.Component {
    static contextType = UserContext

    state = {
        resultSucces: false,
        resultMessage: '',
        showResultView: false,
        showActicityIndicator: false
    }

    leaveRoom() {
        const user = this.context
        this.setState({ showActicityIndicator: true })

        console.log(this.props.item.id)

        user.checkIfConnected()
            .then(() => {
                asyncAxiosPost(`https://cue-cards-app.herokuapp.com/api/leave-room/${this.props.item.id}`, 'EditRoomWindow', null, user.userToken)
                    .then(res => {
                        this.state.resultSucces = true
                        this.state.resultMessage = 'Du hast den raum verlassen'
                        this.state.showActicityIndicator = false
                        this.setState({ showResultView: true })
                    })
                    .catch(() => {
                        this.state.resultSucces = false
                        this.state.resultMessage = 'Probleme mit dem Server'
                        this.state.showActicityIndicator = false
                        this.setState({ showResultView: true })
                    })

            }).catch(() => {
                this.state.resultSucces = false
                this.state.resultMessage = 'Netzwerkfehler'
                this.state.showActicityIndicator = false
                this.setState({ showResultView: true })
            })

    }


    render() {
        const { showResultView, resultSucces, resultMessage, showActicityIndicator } = this.state
        return (
            <Modal
                animationType="fade"
                transparent={true}>
                <View style={styles.background}>
                    <View style={styles.window}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.onSetVisibility(false)}>
                            <AntDesign name="closecircleo" size={24} color="white" />
                        </TouchableOpacity>
                        {showResultView ?
                            <ResultView resultSucces={resultSucces} resultMessage={resultMessage} />
                            :
                            <View>
                                {showActicityIndicator ?
                                    <ActicityIndicatorView />
                                    :
                                    <View>
                                        <TouchableOpacity style={styles.button} onPress={() => this.leaveRoom(this.props.item)}>
                                            <Text style={styles.buttonText}>Raum verlassen</Text>
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


