import React, { useContext } from 'react'
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Text } from 'react-native'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import ImagePickerButton from '../../API/ImagePicker'

import uuid from 'react-native-uuid'



const windowWidth = Dimensions.get('window').width;


export default class Vocable extends React.Component {

    static contextType = ListStructureContext


    state = {
        id: this._isValueNull(this.props.route.params.id) ? uuid.v1() : this.props.route.params.id,
        cardType: "FT",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? 0 : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? '' : this.props.route.params.questionText,
        solution: this._isValueNull(this.props.route.params.solution) ? '' : this.props.route.params.solution
    }

    _isValueNull(value) {
        if (value === undefined) {
            return true
        }
        return false
    }



    _saveAndGoBack() {
        const updateCards = this.context
        this._save()
        updateCards.storeDataOnDevice()
        this.props.navigation.goBack()
    }


    _saveAndNew() {
        this._save()
        this.setState({ id: uuid.v1() })
        this.setState({ questionText: '' })
        this.setState({ solution: [] })
    }



    _save() {

        const { id, cardType, questionText, solution } = this.state
        const updateCards = this.context

        let newCard = {
            id: id,
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
                if (copy[i].id === id) {
                    index = i
                }
                copy[index] = newCard
            }
        }

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
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder=" .. und hier deine Antwort"
                    onChangeText={text => this.setState({ solution: text })}>
                    {this.state.solution}
                </TextInput>
                <View style={styles.bottomView} >
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndGoBack()}>
                        <Text style={{ fontStyle: 'italic', fontSize: 10, color: 'white' }}>speichern</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndNew()}>
                        <Text style={{ fontStyle: 'italic', fontSize: 10, color: 'white' }}>speichern und neu</Text>
                    </TouchableOpacity>
                </View>
            </View >

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#595959"
    },
    answer: {
        // flex: 1,
        borderColor: '#848a91',
    },
    textInput: {
        // flex: 1,
        padding: 5,
        borderColor: 'black',
        color: 'black',
        borderWidth: 1,
        margin: 20
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    saveButton: {
        backgroundColor: '#2c2e30',
        height: 40,
        width: 130,
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    questionInput: {
        padding: 5,
        borderColor: 'black',
        color: 'black',
        borderWidth: 1,
        margin: 20,
        fontSize: 15,
        fontStyle: 'italic'

    },

});