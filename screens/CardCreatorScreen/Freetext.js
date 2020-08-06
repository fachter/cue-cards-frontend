import React, { useContext } from 'react'
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Text } from 'react-native'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import ImagePickerButton from '../../API/ImagePicker'

import uuid from 'react-native-uuid'



const windowWidth = Dimensions.get('window').width;


export default class Vocable extends React.Component {

    static contextType = ListStructureContext


    state = {
        cardID: this._isValueNull(this.props.route.params.cardID) ? uuid.v1() : this.props.route.params.cardID,
        cardType: "FT",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? null : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? null : this.props.route.params.questionText,
        solution: this._isValueNull(this.props.route.params.solution) ? null : this.props.route.params.solution
    }

    _isValueNull(value) {
        if (value === undefined) {
            return true
        }
        return false
    }

    _save() {

        const { cardID, cardType, questionText, solution } = this.state
        const updateCards = this.context


        let newCard = {
            cardID: cardID,
            cardType: cardType,
            questionText: questionText,
            cardLevel: 0,    //Beim bearbeiten einer Karte wird das Level zurück auf 0 gesetzt
            solution: solution
        }

        let copy = updateCards.currentListStructure

        if (this.props.route.params.mode == "createMode") { // neue Karte erstellen
            copy.push(newCard)
            updateCards.setCurrentListStructure(copy)

        } else if (this.props.route.params.mode == "editMode") {   //alte Karte aktualisieren
            var index
            for (var i = 0; i < copy.length; i++) {
                if (copy[i].ID === id) {
                    index = i
                }
                copy[index] = newCard
            }
        }
        updateCards.storeDataOnDevice()
        this.props.navigation.goBack()
    }



    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.questionInput, { textAlign: 'center' }]}
                    multiline={true}
                    placeholder="Bitte Frage hier eingeben"
                    onChangeText={text => this.setState({ questionText: text })}>
                    {this.state.questionText}
                </TextInput>
                <ImagePickerButton />
                <View style={styles.answer}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        placeholder=" .. und hier deine Antwort"
                        onChangeText={text => this.setState({ solution: text })}>
                        {this.state.solution}
                    </TextInput>
                </View>
                <TouchableOpacity style={styles.bottomView} onPress={() => this._save()}>
                    <View style={styles.saveButton}>
                        <Text style={{ fontStyle: 'italic', fontSize: 20, color: 'white' }}>speichern</Text>
                    </View>
                </TouchableOpacity>
            </View >

        )
    }
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
    }, saveButton: {
        backgroundColor: '#2c2e30',
        height: 40,
        width: 130,
        borderRadius: 30,
        top: 0,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'

    }, bottomView: {
        flex: 1,
    },
    questionInput: {
        flex: 1,
        padding: 5,
        borderColor: 'black',
        color: 'black',
        borderWidth: 1,
        margin: 20,
        fontSize: 15,
        fontStyle: 'italic'

    },

});