import React, { useContext } from 'react'
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Text } from 'react-native'

const windowWidth = Dimensions.get('window').width;

import { CardCreatorContext } from './CardCreatorScreen'


export default function Vocable() {

    const { setSolution, _save } = useContext(CardCreatorContext)

    return (
        <View style={styles.container}>
            <View style={styles.answer}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder=" .. und hier deine Antwort"
                    onChangeText={text => setSolution(text)}>
                </TextInput>
            </View>
            <TouchableOpacity style={styles.bottomView} onPress={() => _save()}>
                <View style={styles.saveButton}>
                    <Text style={{ fontStyle: 'italic', fontSize: 20, color: 'white' }}>speichern</Text>
                </View>
            </TouchableOpacity>
        </View >

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    answer: {
        flex: 3,
        borderColor: '#848a91',
    },
    textInput: {
        flex: 1,
        padding: 5,
        borderColor: 'black',
        color: 'black',
        borderWidth: 1,
        margin: 20
    },
    bottomView: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: '#2c2e30',
        height: 40,
        width: 130,
        borderRadius: 30,
        top: 0,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
});