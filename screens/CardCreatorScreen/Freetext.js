import React from 'react'
import { View, StyleSheet, TextInput, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

export default function Freetext() {

    return (
        <View style={styles.container}>
            <View style={styles.question}>
                <TextInput
                    style={[styles.textInput, { textAlign: 'center' }]}
                    multiline={true}
                    placeholder="Bitte Frage hier eingeben">
                </TextInput>
            </View>
            <View style={styles.answer}>
                <TextInput
                    style={[styles.textInput,]}
                    multiline={true}
                    placeholder=" .. und hier deine Antwort">
                </TextInput>
            </View>
        </View >

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    question: {
        flex: 1,
        minHeight: 40,
    },
    answer: {
        flex: 3,
        borderColor: '#848a91',
    },
    textInput: {
        flex: 1,
        padding: 5,
        borderColor: '#848a91',
        color: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 20
    },

});