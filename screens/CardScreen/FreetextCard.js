import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';




const card =
{
    questionText: 'Auto',
    cardLevel: 2,            // Stufe im Karteikasten
    numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
    solution: 'Car'
}


export default class Freetext extends React.Component {

    state = {
        solution: 'tippe für die Lösung',
        choice: null,
        backgroundColor: "#111111",
    }



    _saveChoice = (choice) => {
        if (choice === true) {
            this.setState({ backgroundColor: 'green' })
        } else {
            this.setState({ backgroundColor: 'red' })
        }
        setTimeout(() => {
            this.props.getCardBack(choice)
        }, 1000);
    }


    _showSolution = () => {
        this.setState({ solution: this.props.card.solution })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
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