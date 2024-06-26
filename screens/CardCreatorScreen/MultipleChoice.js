import React from 'react'
import { StyleSheet, Image, View, TextInput, FlatList, TouchableOpacity, Text, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../../assets/Logo_grau.png';

import uuid from 'react-native-uuid'
import { ScrollView } from 'react-native-gesture-handler';





export default class MultipleChoice extends React.Component {

    static contextType = ListStructureContext

    state = {
        id: this._isValueNull(this.props.route.params.id) ? uuid.v1() : this.props.route.params.id,
        cardType: "MC",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? 0 : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? '' : this.props.route.params.questionText,
        cardTopic: this._isValueNull(this.props.route.params.cardTopic) ? '' : this.props.route.params.cardTopic,
        answers: this._isValueNull(this.props.route.params.answers) ? [] : this.props.route.params.answers,
        questionInputHeight: 0,
    }



    _isValueNull(value) {
        if (value === undefined) {
            return true
        }
        return false
    }

    _saveAndGoBack() {
        this._save()
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
        const folders = this.context

        let newCard = {
            id: id,
            cardType: cardType,
            questionText: questionText,
            cardLevel: 0,
            cardTopic: cardTopic,
            answers: answers
        }

        let updatedCards = folders.currentListStructure

        if (this.props.route.params.mode == "createMode") { // neue Karte erstellen
            updatedCards.push(newCard)

        } else if (this.props.route.params.mode == "editMode") {   //alte Karte aktualisieren
            var index
            for (var i = 0; i < updatedCards.length; i++) {
                if (updatedCards[i].id === id) {
                    index = i
                }
                copy[index] = newCard
            }
        }

        folders.setCurrentListStructure(updatedCards, true)

    }


    _addItem() {
        var copy = this.state.answers
        copy.push({
            id: uuid.v1(),
            text: '',
        })

        console.log(copy)
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

        for (let i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].id === id) {
                copy[i].text = text
                this.setState({ answers: copy })
            }
        }


    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : ""}>
                <ScrollView>
                    <TextInput
                        style={[styles.textInput, { marginBottom: 25 }]}
                        multiline={true}
                        placeholder="Frage eingeben"
                        placeholderTextColor="grey"
                        onContentSizeChange={(event) => this.setState({ questionInputHeight: event.nativeEvent.contentSize.height })}
                        onChangeText={text => this.setState({ questionText: text })}>
                        {this.state.questionText}
                    </TextInput>
                    <Text style={styles.erklärtext}>Bitte nur korrekte Antworten eingeben. Die Falschen werden automatisch vom System ergänzt!</Text>
                    <TouchableOpacity onPress={() => this._addItem()}>
                        <View style={styles.addButton}>
                            <Text style={styles.addButtonText}>+  Richtige Antwort hinzufügen</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <SafeAreaView >
                            <FlatList
                                data={this.state.answers}
                                renderItem={({ item }) => (
                                    <AnswerItem
                                        item={item}

                                        getText={this._updateAnswerText.bind(this)}
                                        deleteCallback={this._deleteItemById.bind(this)}
                                    />
                                )}
                                keyExtractor={item => item.id}
                                ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                            />
                        </SafeAreaView>

                    </View>
                    <View style={styles.bottomView} >
                        <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndGoBack()}>
                            <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndNew()}>
                            <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern und Neu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Image source={logo} style={styles.logo} />
            </KeyboardAvoidingView>
        )
    }
}

class AnswerItem extends React.Component {

    state = {
        answerInputHeight: 0,
    }

    render() {
        const { item } = this.props
        return (
            <View style={styles.answeritem}>
                <TextInput
                    style={[styles.textInput, { width: "80%", height: this.state.answerInputHeight }]}
                    multiline={true}
                    placeholder="Antwort"
                    placeholderTextColor="grey"
                    onContentSizeChange={(event) => this.setState({ answerInputHeight: event.nativeEvent.contentSize.height })}
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
        marginLeft: 22,
        marginBottom: 20
    },
    addButtonText: {
        color: '#008FD3',
        fontStyle: 'italic'
    },
    erklärtext: {
        marginBottom: 10,
        marginHorizontal: 10,
        color: 'grey',
        alignSelf: 'center'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    saveButton: {
        backgroundColor: '#008FD3',
        height: 40,
        width: 130,
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginHorizontal: 7
    },
    textInput: {
        paddingLeft: 15,
        padding: 7,
        color: 'black',
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 10,
        fontSize: 15,
        fontStyle: 'italic',
        backgroundColor: '#C7C7C7',
        minHeight: 35
    },
    deleteButton: {
        marginRight: 20,
        marginLeft: 0
    },
    logo: {
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },



});