import React from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Axios from 'axios'

import { UserContext } from '../../LoginRegistrationScreen/UserProvider';

import ResultView from './ResultView'
import PasswordView from './PasswordView'
import RoomIDView from './RoomIDView'
import CreateRoomView from './CreateRoomView';





export default class AddRoomWindow extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)

        this.state = {
            createRoomVisible: false,
            showPasswordView: false,
            showActivityIndicator: false,
            showResultView: false,
            JoinSucces: false,
        }
    }



    toggleSwitch() {
        this.setState({ createRoomVisible: !this.state.createRoomVisible })
    }



    askingForRoom(roomID) {
        const user = this.context

        return new Promise((resolve, reject) => {
            Axios.post('ROOMIDLINK', { data }, {
                headers: {
                    'Authorization': "Bearer " + user.userToken
                }
            }).then(res => {
                if (res.status === 200) {
                    resolve()
                    console.log(`Beitreten des Raumes mit der ID ${roomID} ` + res)
                    this.setState({ showResultView: true })

                } else if (res.status === 202) {
                    this.setState({ showPasswordView: true })
                }
            }).catch(err => {
                alert(`Der Raum mit der ID ${roomID} ist nicht vorhanden`)
                console.log(`Beitreten des Raumes mit der ID ${roomID} ` + res)
                reject()

            })
        })
    }



    askingServerForRightPassword() {
        this.setState({ showActivityIndicator: true })

        return new Promise((resolve, reject) => {
            Axios.post('PASSWORDLINK', { data }, {
                headers: {
                    'Authorization': "Bearer " + user.userToken
                }
            }).then(res => {
                this.state.PasswordView = false
                this.state.JoinSucces = true
                this.setState({ showResultView: true })

                resolve('erfolgreich ' + res)
            }).catch(err => {
                this.state.PasswordView = false
                this.state.JoinSucces = true
                this.setState({ showResultView: true })
                reject('fehlgeschlagen ' + err)
            })
        })
    }



    closeWindow() {
        this.state.createRoomVisible = false
        this.state.showPasswordView = false
        this.state.showActivityIndicator = false
        this.state.showResultView = false
        this.setState({ waitForPasswordResult: true })
        this.props.onSetVisibility()
    }

    render() {
        const { createRoomVisible, showPasswordView, showResultView } = this.state
        const user = this.context

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.addRoomWindowVisibility}
                onRequestClose={() => this.closeWindow()}>
                <View style={styles.background}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => this.closeWindow()}>
                        <AntDesign name="closecircleo" size={24} color="grey" />
                    </TouchableOpacity>
                    <View style={styles.window}>

                        {
                            createRoomVisible ?
                                <CreateRoomView context={user.context} />
                                :
                                <View >
                                    {
                                        showResultView ?
                                            <ResultView />
                                            :
                                            <View >
                                                {
                                                    showPasswordView ?
                                                        <PasswordView
                                                            onAskingServerForRightPassword={this.askingServerForRightPassword.bind(this)}
                                                            onShowActicityIndicator={this.state.showActivityIndicator}
                                                            onResult={this.state.JoinSucces} />
                                                        :
                                                        <RoomIDView onAskingForRoom={this.askingForRoom.bind(this)} internetConnection={user.isConnected} />
                                                }
                                            </View>
                                    }
                                </View>
                        }
                    </View >

                    <View style={styles.switchView}>
                        {createRoomVisible ? <Text style={[styles.switchText, { position: 'absolute', left: 50 }]}>beitreten</Text> : null}
                        <Switch
                            style={{ alignSelf: 'center' }}
                            trackColor={{
                                false: "grey", true: "grey"
                            }}
                            thumbColor='#008FD3'
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.toggleSwitch()}
                            value={createRoomVisible}
                        />
                        {createRoomVisible ? null : <Text style={[styles.switchText, { position: 'absolute', right: 50 }]} >erstellen</Text>}
                    </View>
                </View>
            </Modal >
        )
    };
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.85

    },
    window: {
        width: '100%',
        height: '30%',
        alignItems: 'center',

    },
    cancelButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignSelf: 'flex-end',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'

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
    buttonContainer: {
        flexDirection: 'row'
    },
    addButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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
    switchView: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center',
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 50
    },
    switchText: {
        color: 'white',
        marginTop: 5,
        fontSize: 20
    },
});
