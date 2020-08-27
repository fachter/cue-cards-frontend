import React from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Axios from 'axios'

import { UserContext } from '../../LoginRegistrationScreen/UserProvider';

import SuccesView from './SuccesView'
import ActivityIndicatorView from './ActivityIndicatorView'
import PasswordView from './PasswordView'
import RoomIDView from './RoomIDView'
import CreatRoomView from './CreatRoomView'




export default class AddRoomWindow extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)

        this.state = {
            roomName: null,
            roomID: null,

            createRoomVisible: false,
            showPasswordView: false,
            showActivityIndicator: false,
            showJoinRoomSuccesView: false,
            showJoinRoomFailedView: false,
            waitForPasswordResult: true,

            password: null,
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
                    this.setState({ showJoinRoomSuccesView: true })

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
        this.state.showPasswordView = false
        this.setState({ showActivityIndicator: true })

        return new Promise((resolve, reject) => {
            Axios.post('PASSWORDLINK', { data }, {
                headers: {
                    'Authorization': "Bearer " + user.userToken
                }
            }).then(res => {
                this.state.showActivityIndicator = false
                this.setState({ showJoinRoomSuccesView: true })
                resolve('erfolgreich ' + res)
            }).catch(err => {
                this.state.showActivityIndicator = false
                this.setState({ showJoinRoomFailedView: true })
                reject('fehlgeschlagen ' + err)
            })
        })
    }


    render() {
        const { createRoomVisible, showPasswordView } = this.state
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.addRoomWindowVisibility}
                onRequestClose={() => this.props.onSetVisibility()}>
                <View style={styles.background}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.onSetVisibility()}>
                        <AntDesign name="closecircleo" size={24} color="grey" />
                    </TouchableOpacity>
                    {this.state.createRoomVisible ? <View style={styles.window}>
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

                            <TouchableOpacity style={styles.saveButton} onPress={() => this.props.onAdd(this.state.roomName)}>
                                <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Erstellen</Text>
                            </TouchableOpacity>
                        </View >
                    </View>
                        :
                        <View style={styles.window}>
                            {showPasswordView ?
                                <View style={styles.window}>
                                    <Text
                                        style={styles.headingText}>Password notwendig:</Text>
                                    <TextInput
                                        style={styles.friendName}
                                        placeholderTextColor="grey"
                                        onChangeText={text => this.state.password = text}>
                                    </TextInput>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.saveButton} onPress={() => this.askingServerForRightPassword(this.state.password)}>
                                            <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                                        </TouchableOpacity>
                                    </View >
                                </View>
                                :
                                <View style={styles.window}>
                                    <Text
                                        style={styles.headingText}>Geb die ID des Raumes ein</Text>
                                    <TextInput
                                        style={styles.friendName}
                                        placeholder="z.B. {Beispiel nach ID anpassen}"
                                        placeholderTextColor="grey"
                                        onChangeText={text => this.state.roomID = text}>
                                    </TextInput>
                                    <View style={styles.buttonContainer}>

                                        <TouchableOpacity style={styles.saveButton} onPress={() => this.askingForRoom(this.state.roomID)}>
                                            <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                                        </TouchableOpacity>
                                    </View >
                                </View>}
                        </View>}

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
