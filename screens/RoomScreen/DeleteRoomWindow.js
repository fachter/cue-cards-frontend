import React from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


export default class DeleteRoomWindow extends React.Component {




    render() {
        const { item, onDeleteWindow, onDelete } = this.props
        return (
            <Modal
                animationType="slide"
                transparent={true}>
                <View style={styles.background}>
                    <View style={styles.window}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => onDeleteWindow()}>
                            <AntDesign name="closecircleo" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
                            <Text style={styles.buttonText}>löschen</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#000000aa',

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


