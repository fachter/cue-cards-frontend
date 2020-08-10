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
        id: this._isValueNull(this.props.route.params.id) ? uuid.v1() : this.props.route.params.id,
        cardType: "MC",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? 0 : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? '' : this.props.route.params.questionText,
        cardTopic: this._isValueNull(this.props.route.params.cardTopic) ? '' : this.props.route.params.cardTopic,
        answers: this._isValueNull(this.props.route.params.answers) ? [] : this.props.route.params.answers
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
        this.setState({ answers: [] })
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
        console.log(newCard)

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


    _addItem() {
        var copy = this.state.answers
        copy.push({
            id: uuid.v1(),
            text: '',
        })

        this.setState({ answers: copy })
    }



    _deleteItemById(id) {
        var copy = this.state.answers
        var index

        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].id === id)
                index = i
        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        this.setState({ answers: copy })
    }


    _updateAnswerText(text, id) {
        var copy = this.state.answers

        console.log(id)
        for (let i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].id === id) {
                copy[i].text = text
                this.setState({ answers: copy })
            }
        }


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
                            keyExtractor={item => item.answerid}
                            ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                        />
                    </ScrollView>
                    <View style={styles.bottomView} >
                        <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndGoBack()}>
                            <Text style={{ fontStyle: 'italic', fontSize: 10, color: 'white' }}>speichern</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndNew()}>
                            <Text style={{ fontStyle: 'italic', fontSize: 10, color: 'white' }}>speichern und neu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                    onChangeText={text => this.props.getText(text, item.id)}>
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
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    saveButton: {
        backgroundColor: '#008FD3',
        height: 40,
        width: 130,
        borderRadius: 30,
        alignSelf: 'center',
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