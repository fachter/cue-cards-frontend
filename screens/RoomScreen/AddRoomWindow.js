import React from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { DatabaseContext } from '../../API/Database';



export default class AddRoomWindow extends React.Component {

    static contextType = DatabaseContext

    constructor(props) {
        super(props)

        this.state = {
            roomName: null,
            roomID: null,
            createRoomVisible: false,
            showPasswordView: false,
            password: null,
        }
    }


    toggleSwitch() {
        this.setState({ createRoomVisible: !this.state.createRoomVisible })
    }


    tryToJoinRoom(roomID) {
        const database = this.context

        database.asyncAxiosPost('link', 'RoomScreen', roomID)
            .then(res => {
                if (res.password) {
                    this.setState({ showPasswordView: true })
                }
                //erneuter Post zur bestätigung Password richtig falsch
                // oder
                //res.password sagt aus das Passwort notwendig ist -> neuer Post schicken des eingegebenen Passwords
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

                                        <TouchableOpacity style={styles.saveButton} onPress={() => console.log("")}>
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
                                        onChangeText={text => this.setState({ roomName: text })}>
                                    </TextInput>
                                    <View style={styles.buttonContainer}>

                                        <TouchableOpacity style={styles.saveButton} onPress={() => console.log("")}>
                                            <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                                        </TouchableOpacity>
                                    </View >
                                </View>}
                        </View>}

                    <View style={styles.switchView}>
                        {createRoomVisible ? <Text style={[styles.switchText, { position: 'absolute', left: 100 }]}>beitreten</Text> : null}
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
                        {createRoomVisible ? null : <Text style={[styles.switchText, { position: 'absolute', right: 100 }]} >erstellen</Text>}
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
        opacity: 0.9
    },
    window: {
        width: '100%',
        height: '30%',
        borderRadius: 5,
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
        fontSize: 23,
    },
    friendName: {
        width: '85%',
        borderRadius: 5,
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: '#202225',
        padding: 10,
        margin: 5
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
        width: '100%',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center'
    },
    switchText: {
        color: '#008FD3'
    }


});
