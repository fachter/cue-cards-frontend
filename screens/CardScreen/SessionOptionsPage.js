import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, CheckBox } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class SessionOptionsPage extends React.Component {



    render() {
        const { onsetMaxLevelIncluded, onsetShuffleCards, maxLevelIncluded, shuffleCards, onStartSession } = this.props
        return (
            <View style={styles.container}>
                <View style={[styles.optionView, { bottom: 350 }]}>
                    <Text style={styles.text}>Maximales Kartenlevel mit abfragen?</Text>
                    <CheckBox
                        value={maxLevelIncluded}
                        onValueChange={value => onsetMaxLevelIncluded(value)}
                        style={styles.checkbox}
                    />
                </View>
                <View style={[styles.optionView, { bottom: 300 }]}>
                    <Text style={styles.text}>Karten mischen?</Text>
                    <CheckBox
                        value={shuffleCards}
                        onValueChange={value => onsetShuffleCards(value)}
                        style={styles.checkbox}
                    />
                </View>

                <TouchableOpacity style={styles.startSessionButton} onPress={() => onStartSession()}>
                    <MaterialCommunityIcons name="play-circle-outline" size={60} color="blue" />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111111",
    },
    startSessionButton: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionView: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontStyle: 'italic'
    },

})
