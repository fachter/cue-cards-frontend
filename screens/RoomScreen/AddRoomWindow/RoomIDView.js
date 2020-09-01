import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class RoomIDView extends React.Component {

    state = {
        roomID: null,
    }

    render() {
        return (
            <View style={styles.window}>
                {this.props.internetConnection ?
                    <View style={styles.window}>
                        <Text
                            style={styles.headingText}>Geb die ID des Raumes ein</Text>
                        <TextInput
                            style={styles.friendName}
                            placeholder="z.B. {Beispiel nach ID anpassen}"
                            placeholderTextColor="grey"
                            onChangeText={text => this.setState({ roomID: text })}>
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={() => this.props.onAskingForRoom(this.state.roomID)}>
                                <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                            </TouchableOpacity>
                        </View >
                    </View>
                    :
                    <View>
                        <Text>Prüfe deine Internetverbindung</Text>
                    </View>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    window: {
        width: '100%',
        alignItems: 'center',

    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 20,
    },
    friendName: {
        width: '100%',
        borderRadius: 5,
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: '#202225',
        padding: 10,
        margin: 5,

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
    buttonContainer: {
        flexDirection: 'row'
    },
});