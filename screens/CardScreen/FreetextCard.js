import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
import logo from '../../assets/Logo_grau.png';



const card =
{
    questionText: 'Auto',
    cardLevel: 2,            //@Philip das ist noch hatt gecodet Stufe im Karteikasten
    numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
    solution: 'Car'         //@Philip muss das nicht noch weg?
}


export default class Freetext extends React.Component {

    state = {
        solution: 'Tippe für die Lösung',
        choice: null,
        backgroundColor: '#2f3136',
        color: 'white',
        solutionShown: false,
    }



    _saveChoice = (choice) => {
        if (choice === true) {
            this.setState({
                color: '#3CB371'
            })
        } else {
            this.setState({
                color: '#b20000'
            })
        }
        setTimeout(() => {
            this.props.getCardBack(choice)
            this.setState({
                backgroundColor: '#2f3136',
                solution: 'Tippe für die Lösung',
                color: 'white'
            })

        }, 1500);
    }


    _showSolution = () => {
        this.setState({ solution: this.props.card.solution })
        this.setState({ solutionShown: true })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <View style={styles.trennlinie}></View>
                <TouchableOpacity style={styles.solution} onPress={() => this._showSolution()}>
                    <Text style={[styles.solutionText, { color: this.state.color }]}>{this.state.solution}</Text>
                </TouchableOpacity>

                {this.state.solutionShown ? <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveChoice(false)} >
                        <Icon.Feather name="x" size={40} color='#008FD3' />
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveChoice(true)} >
                        <Icon.Feather name="check" size={40} color='#008FD3' />
                    </TouchableOpacity >
                </View> : null}
                <Image source={logo} style={styles.logo} />
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 4,
    },
    trennlinie: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#008FD3'
    },
    solution: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    solutionText: {
        fontSize: 23,
        fontStyle: 'italic',
        color: 'grey'
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
        marginBottom: 35,
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },

});