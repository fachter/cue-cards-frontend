import React from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native'
import { AntDesign } from '@expo/vector-icons';



import RoomIDView from './RoomIDView'
import CreateRoomView from './CreateRoomView';





export default class AddRoomWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            createRoomVisible: false,
        }
    }


    toggleSwitch() {
        this.setState({ createRoomVisible: !this.state.createRoomVisible })
    }

    closeWindow() {
        this.state.createRoomVisible = false
        this.state.showPasswordView = false
        this.state.showActivityIndicator = false
        this.state.showResultView = false
        this.setState({ waitForPasswordResult: true })
        this.props.onSetVisibility()
    }

    renderWindow() {
        const { createRoomVisible } = this.state

        if (createRoomVisible === true) {
            return (
                <CreateRoomView updateRooms={this.props.updateRooms} />
            )

        } else {
            return (
                <RoomIDView updateRooms={this.props.updateRooms} />
            )
        }
    }

    render() {
        const { createRoomVisible } = this.state
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
                        {this.renderWindow()}
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
