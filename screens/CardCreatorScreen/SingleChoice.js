import React from 'react'
import uuid from 'react-native-uuid'

import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import ImagePickerButton from '../../API/ImagePicker'



export default class SingleChoice extends React.Component {

    static contextType = ListStructureContext


    state = {
        cardID: this._isValueNull(this.props.route.params.cardID) ? uuid.v1() : this.props.route.params.cardID,
        cardType: "SC",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? null : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? null : this.props.route.params.questionText,
        cardTopic: this._isValueNull(this.props.route.params.cardTopic) ? null : this.props.route.params.cardTopic,
        answers: this._isValueNull(this.props.route.params.answers) ? [{ D: null, text: '' }] : this.props.route.params.answers
    }

    _isValueNull(value) {

        if (value === undefined) {
            return true
        }
        return false
    }

    _save() {
        const { cardID, cardType, questionText, cardTopic, answers } = this.state
        const updateCards = this.context

        let newCard = {
            cardID: cardID,
            cardType: cardType,
            questionText: questionText,
            cardLevel: 0,
            cardTopic: cardTopic,
            answers: answers
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


    updateAnswers(text) {
        var copy = []
        copy.push({
            ID: uuid.v1(),
            text: text,
        })

        this.setState({ answers: copy })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Frage eingeben"
                    placeholderTextColor="grey"
                    onChangeText={text => this.setState({ questionText: text })}>
                    {this.state.questionText}
                </TextInput>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Antwort eingeben"
                    placeholderTextColor="grey"
                    onChangeText={text => this.updateAnswers(text)}>
                    {this.state.answers[0].text}
                </TextInput>
                <ImagePickerButton />
                <TouchableOpacity style={styles.bottomView} onPress={() => this._save()}>
                    <View style={styles.saveButton}>
                        <Text style={{ fontStyle: 'italic', fontSize: 20, color: 'white' }}>speichern</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
        paddingTop: 25
    },
    textInput: {
        paddingLeft: 15,
        padding: 7,
        marginBottom: 25,
        borderRadius: 10,
        color: 'black',
        margin: 20,
        fontSize: 15,
        fontStyle: 'italic',
        backgroundColor: '#C7C7C7'
    },
    saveButton: {
        backgroundColor: '#008FD3',
        height: 40,
        width: 130,
        borderRadius: 30,
        top: 0,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
});