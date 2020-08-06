import React, { useContext, useState } from 'react'
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Dimensions, Text, ScrollView } from 'react-native'
import ImagePickerButton from '../../API/ImagePicker'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import Icon from 'react-native-vector-icons/Ionicons';

import uuid from 'react-native-uuid'





const windowWidth = Dimensions.get('window').width;
const data = [
]



export default class MultipleChoice extends React.Component {

    static contextType = ListStructureContext

    state = {
        cardID: this._isValueNull(this.props.route.params.cardID) ? uuid.v1() : this.props.route.params.cardID,
        cardType: "MC",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? null : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? null : this.props.route.params.questionText,
        cardTopic: this._isValueNull(this.props.route.params.cardTopic) ? null : this.props.route.params.cardTopic,
        answers: this._isValueNull(this.props.route.params.answers) ? [] : this.props.route.params.answers
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
        console.log(newCard)

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


    _addItem() {
        var copy = this.state.answers
        copy.push({
            ID: uuid.v1(),
            text: '',
        })

        this.setState({ answers: copy })
    }



    _deleteItemById(id) {
        var copy = this.state.answers
        var index

        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].ID === id)
                index = i
        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        this.setState({ answers: copy })
    }


    _updateAnswerText(text, id) {
        var copy = this.state.answers
        var index
        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].ID === id)
                index = i
        }
        copy[index].text = text
        this.setState({ answers: copy })
    }

    render() {
        return (
            <View style={styles.container} >
                <TextInput
                    style={[styles.textInput, { marginBottom: 25 }]}
                    multiline={true}
                    placeholder="Frage eingeben"
                    placeholderTextColor="grey"
                    onChangeText={text => this.setState({ questionText: text })}>
                    {this.state.questionText}
                </TextInput>
                <TouchableOpacity onPress={() => this._addItem()}>
                    <View style={styles.addButton}>
                        <Text style={styles.addButtonText}>+ Frage hinzufügen</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <ScrollView>
                        <FlatList
                            data={this.state.answers}
                            renderItem={({ item }) => (
                                <AnswerItem
                                    item={item}
                                    getText={this._updateAnswerText.bind(this)}
                                    deleteCallback={this._deleteItemById.bind(this)}
                                />
                            )}
                            keyExtractor={item => item.answerID}
                        />
                    </ScrollView>
                </View>
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

class AnswerItem extends React.Component {
    render() {
        const { item } = this.props
        return (
            <View style={styles.answeritem}>
                <TextInput
                    style={[styles.textInput, { width: "75%" }]}
                    placeholder="Antwort"
                    placeholderTextColor="grey"
                    onChangeText={text => this.props.getText(text, item.ID)}>
                    {item.text}
                </TextInput>
                <Icon.Button
                    style={styles.deleteButton}
                    name="ios-close"
                    size={35} color="white"
                    backgroundColor="#2f3136"
                    onPress={() => this.props.deleteCallback(this.props.id)}
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f3136',
        paddingTop: 25
    },
    answeritem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    addButton: {
        height: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20
    },
    addButtonText: {
        color: "white",
        fontSize: 17,
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
    textInput: {
        paddingLeft: 15,
        padding: 7,
        color: 'black',
        margin: 20,
        borderRadius: 10,
        fontSize: 15,
        fontStyle: 'italic',
        backgroundColor: '#C7C7C7',
    },
    deleteButton: {
        marginRight: 20,
        marginLeft: 10
    }



});