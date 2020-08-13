import React from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



export default class AddRoomWindow extends React.Component {

    state = {
        roomName: null
    }

    render() {





        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.addRoomWindowVisibility}
                onRequestClose={() => this.props.onSetVisibility()}>
                <View style={styles.background}>
                    <View style={styles.window}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => addRoomWindowVisibility(false)}>
                            <AntDesign name="closecircleo" size={24} color="grey" />
                        </TouchableOpacity>
                        <Text
                            style={styles.headingText}>Raumname oder RaumID</Text>
                        <TextInput
                            style={styles.friendName}
                            placeholder="z.B. #Lerngruppe1234"
                            placeholderTextColor="grey"
                            onChangeText={text => this.setState({ roomName: text })}>
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={() => this.props.onAdd(this.state.roomName)}>
                                <MaterialCommunityIcons name="import" size={25} color="white" />
                                <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={() => this.props.onAdd(this.state.roomName)}>
                                <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Erstellen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        opacity: 0.9
    },
    window: {
        width: '100%',
        height: '20%',
        borderRadius: 5,
        alignItems: 'center'
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
        backgroundColor: 'green',
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
    }
});
