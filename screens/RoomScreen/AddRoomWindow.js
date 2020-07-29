import React from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'


export default class AddRoomWindow extends React.Component {

    

    render() {
        return (
            <View style={styles.container} >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.addRoomWindowVisibility}
                    onRequestClose={() => this.props.onSetVisibility()}>
                    <View style={styles.background}>
                        <View style={styles.window}>
                            <Text
                                style={styles.headingText}>Gebe den Raumnamen ein</Text>
                            <TextInput style={styles.friendName}></TextInput>
                            <TouchableOpacity style={styles.addButton}  >
                                <Icon.Feather name="check" size={50} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa',
    },
    window: {
        width: '80%',
        height: '20%',
        borderRadius: 5,
        backgroundColor: 'gray',
        alignItems: 'center'
    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 20,
        fontStyle: 'italic'
    },
    friendName: {
        width: '80%',
        height: '10%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'grey',
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: 'black',
        padding: 10,
        textAlign: 'center',
    },
    addButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'green',
    }
});
