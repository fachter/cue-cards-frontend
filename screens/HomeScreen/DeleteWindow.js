import React from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


export default class DeleteWindow extends React.Component {

    _checkIfItemIsFolderOrSet() {
        //Im Falle einer Karte -> undifine
        if (this.props.item.isFolder == true || this.props.item.isFolder == false) {
            return true
        }
        return false
    }



    render() {
        const { item, onDeleteWindow, onDelete, onNavigateToCardCreator } = this.props
        return (
            <Modal
                animationType="slide"
                transparent={true}>
                <View style={styles.background}>
                    <View style={styles.window}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => onDeleteWindow()}>
                            <AntDesign name="closecircleo" size={24} color="white" />
                        </TouchableOpacity>
                        {this._checkIfItemIsFolderOrSet() ? null : <TouchableOpacity style={styles.button} onPress={() => onNavigateToCardCreator(item)} >
                            <Text style={styles.buttonText}>bearbeiten</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={styles.button} onPress={() => onDelete(item.ID)}>
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


