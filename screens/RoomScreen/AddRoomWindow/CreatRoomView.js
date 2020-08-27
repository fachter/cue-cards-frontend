import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class CreateRoomView extends React.Component {

    render() {
        return (
            <View style={styles.window}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    window: {
        width: '100%',
        height: '30%',
        alignItems: 'center',

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