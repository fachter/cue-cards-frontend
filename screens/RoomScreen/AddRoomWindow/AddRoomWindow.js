import React from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';



import RoomIDView from './RoomIDView'
import CreateRoomView from './CreateRoomView';





export default class AddRoomWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            createRoomVisible: false,
            color1: '#008FD3',
            color2: 'grey',
            color3: '#008FD3',
            color4: 'white',
        }
    }

    openRoomIDView() {
        this.setState({ createRoomVisible: false, color1: '#008FD3', color2: 'grey', color3: '#008FD3', color4: 'white' })
    }

    openAddRoomWindow() {
        this.setState({ createRoomVisible: true, color1: 'grey', color2: '#008FD3', color3: 'white', color4: '#008FD3' })
    }

    closeWindow() {
        this.state.createRoomVisible = false
        this.state.showPasswordView = false
        this.state.showActivityIndicator = false
        this.state.showResultView = false
        this.setState({ waitForPasswordResult: true, color1: '#008FD3', color2: 'grey', color3: '#008FD3', color4: 'white' })
        this.props.onSetVisibility()
    }

    renderWindow() {
        const { createRoomVisible } = this.state

        if (createRoomVisible === true) {
            return (
                <CreateRoomView onSetVisibility={this.props.onSetVisibility} updateRooms={this.props.updateRooms} />
            )

        } else {
            return (
                <RoomIDView updateRooms={this.props.updateRooms} onSetVisibility={this.props.onSetVisibility} />
            )
        }
    }

    render() {

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.addRoomWindowVisibility}
                onRequestClose={() => this.closeWindow()}>
                <View style={styles.background}>
                    <KeyboardAvoidingView
                        // style={{ borderColor: 'red', borderWidth: 1, }}
                        behavior={Platform.OS == "ios" ? "padding" : ""}
                    >
                        <ScrollView>
                            <View style={{ marginTop: '40%' }}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => this.closeWindow()}>
                                    <AntDesign name="closecircleo" size={24} color="grey" />
                                </TouchableOpacity>
                                <View style={styles.auswahlLeiste}>
                                    <TouchableOpacity style={[styles.auswahlKnopf, { borderColor: this.state.color1 }]} onPress={() => this.openRoomIDView()}>
                                        <Text style={[styles.auswahlText, { color: this.state.color3 }]}>Beitreten</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.auswahlKnopf, { borderColor: this.state.color2 }]} onPress={() => this.openAddRoomWindow()}>
                                        <Text style={[styles.auswahlText, { color: this.state.color4 }]} >Erstellen</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.window}>
                                    {this.renderWindow()}
                                </View >
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
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
        //height: '30%',
        alignItems: 'center',

    },
    cancelButton: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        margin: 5,
        justifyContent: 'center',
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
        marginHorizontal: 7,
        marginBottom: 20
    },
    auswahlLeiste: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 30
    },
    auswahlKnopf: {
        width: '50%',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        paddingBottom: 20
    },
    auswahlText: {
        marginTop: 5,
        fontSize: 20,
    },
});
