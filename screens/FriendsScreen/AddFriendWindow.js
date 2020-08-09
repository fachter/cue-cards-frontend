import React from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';


export default class AddFriendWindow extends React.Component {

    state = {
        newFriendID: null
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.addWindowVisibility}
                onRequestClose={() => this.props.onSetVisibility()}>
                <View style={styles.background}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => visible = "true"}>
                        <AntDesign name="closecircleo" size={24} color="grey" />
                    </TouchableOpacity>
                    <Text
                        style={styles.headingText}>ID des Freundes:</Text>
                    <TextInput
                        style={styles.friendName}
                        onChangeText={text => this.setState({ newFriendID: text })}
                        placeholder="z.B. #1234MaxMeyer"
                        placeholderTextColor="grey">
                    </TextInput>
                    <TouchableOpacity style={styles.addButton}  >
                        <Icon.Feather name="check" size={35} color="#008FD3" />
                    </TouchableOpacity>
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
        backgroundColor: 'black',
        opacity: 0.9
    },
    window: {
        width: '80%',
        height: 155,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#008FD3',
        backgroundColor: 'black',
        alignItems: 'center'
    },
    headingText: {
        color: 'white',
        margin: 10,
        marginBottom: 20,
        fontSize: 23,
    },
    friendName: {
        width: '85%',
        borderRadius: 5,
        borderColor: 'grey',
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: '#202225',
        padding: 10,
        margin: 5
    },
    addButton: {
        height: 50,
        width: 50,
        borderRadius: 30,
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
    }
});
