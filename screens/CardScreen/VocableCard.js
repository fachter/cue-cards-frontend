import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';




const card =
{
    cardID: '1',
    questionText: 'Auto',
    cardLevel: 2,            // Stufe im Karteikasten
    numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
    solution: 'Car'
}



export default class VocableCard extends React.Component {

    state = {
        card: card,
        solution: 'tippe für die Lösung',
        choice: null,
    }



    _saveChoice = (choice) => {
        this.props.getCardBack(choice)
    }


    _showSolution = () => {
        this.setState({ solution: this.state.card.solution })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.solution} onPress={() => this._showSolution()}>
                    <Text style={styles.solutionText}>{this.state.solution}</Text>
                </TouchableOpacity>

                <View style={styles.buttonView}>
                    <TouchableOpacity style={[styles.saveButton, { backgroundColor: 'red' }]} onPress={() => this._saveChoice(false)} >

                        <Entypo name="cross" size={50} color="black" />
                    </TouchableOpacity >
                    <TouchableOpacity style={[styles.saveButton, { backgroundColor: 'green' }]} onPress={() => this._saveChoice(true)} >
                        <Icon.Feather name="check" size={50} />
                    </TouchableOpacity >
                </View>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: '#4b5057'
    },
    solution: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    solutionText: {
        fontSize: 30,
        fontStyle: 'italic',
        color: 'white'
    },
    buttonView: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        flexDirection: 'row'

    },
    saveButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

});