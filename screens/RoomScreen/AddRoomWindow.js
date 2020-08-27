import React from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import * as Icon from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



export default class AddRoomWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName: null,
            roomID: null,
            createRoomVisible: false,
            buttonTitle: 'Suchen'
        }
    }

    componentDidUpdate() {

    }


    toggleSwitch() {
        this.setState({ createRoomVisible: !this.state.createRoomVisible })
    }



    render() {

        const { createRoomVisible } = this.state
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
                    <View style={styles.switchView}>
                        {/* {createRoomVisible ? <Text style={[styles.switchText, { position: 'absolute', right: 100 }]} >Erstellen</Text> : null}
                        {createRoomVisible ? null : <Text style={[styles.switchText, { position: 'absolute', left: 100 }]}>Beitreten</Text>} */}
                        <Text style={[styles.switchText, { position: 'absolute', right: 80 }]} >Erstellen</Text>
                        <Text style={[styles.switchText, { position: 'absolute', left: 80 }]}>Beitreten</Text>
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
                    </View>
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
                    </View> :
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

                                <TouchableOpacity style={styles.saveButton} onPress={() => this.props.onJoin(this.state.roomID)}>
                                    <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                    <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                                </TouchableOpacity>
                            </View >
                        </View>}
                </View>
            </Modal>
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
