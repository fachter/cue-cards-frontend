import React from 'react'
import uuid from 'react-native-uuid'

import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import ImagePickerButton from '../../API/ImagePicker'
import logo from '../../assets/Logo_grau.png';



export default class SingleChoice extends React.Component {

    static contextType = ListStructureContext


    state = {
        id: this._isValueNull(this.props.route.params.id) ? uuid.v1() : this.props.route.params.id,
        cardType: "SC",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? 0 : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? '' : this.props.route.params.questionText,
        cardTopic: this._isValueNull(this.props.route.params.cardTopic) ? '' : this.props.route.params.cardTopic,
        answers: this._isValueNull(this.props.route.params.answers) ? [{ id: null, text: '' }] : this.props.route.params.answers,
        questionInputHeight: 0,
        answerInputHeight: 0,

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
        this.setState({ cardTopic: '' })
        this.setState({ answers: [{ id: null, text: '' }] })
    }



    _save() {
        const { id, cardType, questionText, cardTopic, answers } = this.state
        const updateCards = this.context

        let newCard = {
            id: id,
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
                if (copy[i].id === id) {
                    index = i
                }
                copy[index] = newCard
            }
        }

    }


    updateAnswers(text) {
        var copy = []
        copy.push({
            id: uuid.v1(),
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
                    onContentSizeChange={(event) => this.setState({ questionInputHeight: event.nativeEvent.contentSize.height })}
                    onChangeText={text => this.setState({ questionText: text })}>
                    {this.state.questionText}
                </TextInput>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Antwort eingeben"
                    placeholderTextColor="grey"
                    onContentSizeChange={(event) => this.setState({ answerInputHeight: event.nativeEvent.contentSize.height })}
                    onChangeText={text => this.updateAnswers(text)}>
                    {this.state.answers[0].text}
                </TextInput>
                <View style={styles.bottomView} >
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndGoBack()}>
                        <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndNew()}>
                        <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern und Neu</Text>
                    </TouchableOpacity>
                </View>
                <Image source={logo} style={styles.logo} />
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
        borderRadius: 10,
        color: 'black',
        margin: 20,
        fontSize: 15,
        fontStyle: 'italic',
        backgroundColor: '#C7C7C7'
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    saveButton: {
        backgroundColor: '#008FD3',
        height: 40,
        width: 130,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 7
    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },
});