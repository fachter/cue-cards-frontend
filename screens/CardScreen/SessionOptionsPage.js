import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, CheckBox } from 'react-native'


export default class SessionOptionsPage extends React.Component {



    render() {
        const { onsetLevel6included, onsetShuffleCards, level6included, shuffleCards, onStartSession } = this.props
        return (
            <View style={styles.container}>
                <View style={[styles.optionView, { bottom: 350 }]}>
                    <Text>Karten Level 6 mit abfragen?</Text>
                    <CheckBox
                        value={level6included}
                        onValueChange={value => onsetLevel6included(value)}
                        style={styles.checkbox}
                    />
                </View>
                <View style={[styles.optionView, { bottom: 300 }]}>
                    <Text>Karten mischen?</Text>
                    <CheckBox
                        value={shuffleCards}
                        onValueChange={value => onsetShuffleCards(value)}
                        style={styles.checkbox}
                    />
                </View>

                <TouchableOpacity style={styles.startSessionButton} onPress={() => onStartSession()}></TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    startSessionButton: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        height: 50,
        width: 50,
        backgroundColor: 'green'
    },
    optionView: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center'
    }
})