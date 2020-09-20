import React, { useState } from 'react'
import { Modal, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import * as Icon from '@expo/vector-icons'

import { AntDesign } from '@expo/vector-icons';


export default function EditRoomWindow({ onSetVisibility, visibility, onEditItemName, item }) {


    const [newItemName, setNewItemName] = useState('')

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visibility}
            onRequestClose={() => onSetVisibility(false)}>
            <View style={styles.background}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => onSetVisibility(false)}>
                    <AntDesign name="closecircleo" size={24} color="grey" />
                </TouchableOpacity>
                <Text
                    style={styles.headingText}>Name:</Text>
                <TextInput
                    style={styles.fileNameTextInput}
                    onChangeText={text => setNewItemName(text)}
                    placeholder="z.B. Geschichte"
                    placeholderTextColor="grey"
                >
                </TextInput>
                <TouchableOpacity onPress={() => onEditItemName(item, newItemName)} >

                    <View style={styles.saveButton}>
                        <Icon.Feather name="check" size={35} color="#008FD3" />
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'red'
    //},
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.9
    },
    window: {
        width: '80%',
        height: '15%',
        flexDirection: 'row',
        borderRadius: 5
    },

    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 23,
    },

    fileNameTextInput: {
        width: '85%',
        borderRadius: 5,
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: '#202225',
        padding: 10,
        margin: 5
    },

    saveButton: {
        height: 50,
        width: 50,
        borderRadius: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        borderWidth: 1,
        borderColor: 'grey',
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

});
