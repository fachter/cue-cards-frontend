import React from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native'


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
                        <TouchableOpacity style={styles.button} onPress={() => onDeleteWindow()}>
                            <Text>x</Text>
                        </TouchableOpacity>
                        {this._checkIfItemIsFolderOrSet() ? null : <TouchableOpacity style={styles.button} onPress={() => onNavigateToCardCreator(item)} >
                            <Text>bearbeiten</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={styles.button} onPress={() => onDelete(item.ID)}>
                            <Text>löschen</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '80%',
        height: '20%',
        borderRadius: 5,
        backgroundColor: 'red'
    },
    button: {
        height: 50,
        width: 50,
        backgroundColor: 'blue'
    }
});


