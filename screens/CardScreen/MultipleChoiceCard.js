import React from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'

import AnswerListItem from './AnswerListItem'




const dummyArray = []


export default class MulitpleChoiceCard extends React.Component {

    state = {
        card: this.props.card,
        answers: this.props.card.answers,

        choice: null,  // true/false, je nachdem ob richtig oder falsch gewählt wurde
    }


    componentDidMount() {
        this._createDummyArray()
    }

    componentWillMount() {
        this._fillWithRandomTopicAnswers()
    }





    //Erstelle Array, in der Größe der Antworten der Karte
    //Dient als Copy zum abgleichen
    _createDummyArray = () => {
        let answer = {
            cardState: false,
            item: null
        }

        for (let i = 0; i < this.state.card.answers.length; i++) {
            dummyArray.push(answer)
        }
    }





    _fillWithRandomTopicAnswers = () => {
        let answerPool = this.props.answerPool
        let maximalAnswers = 4
        //füllt die Antwortmöglichkeiten bis zur Zahl 4 auf
        for (let i = this.state.card.numberOfRightAnswers; i < maximalAnswers; i++) {
            this.state.answers.push(this._getRandomAnswer(answerPool))
        }
    }
    _getRandomAnswer = (answerPool) => {
        let min = Math.ceil(0);
        let max = Math.floor(answerPool.length);
        let randomNumber = Math.floor(Math.random() * (max - min)) + min;
        return this.props.answerPool[randomNumber]
    }







    _checkChoiceAndSendBack = () => {
        this._checkTheChoice()
        this.props.getCardBack(this.state.choice)
    }

    _checkTheChoice = () => {
        //filtert alle auf true gesetzten Antworten heraus und setzt sie in ein Array
        let arrayOfChosenAnswers = []

        for (let i = 0; i < dummyArray.length; i++) {
            if (dummyArray[i].cardState) {
                arrayOfChosenAnswers.push(dummyArray[i].item)
            }
        }

        let numberOfChosenAnswers = arrayOfChosenAnswers.length

        //Prüft ob die ausgewählten Antworten, der Karte angehören (checkID = cardID) 
        //Fügt die Anzahl der übereinstimmungen numerOfConsistenAnswers hinzu
        var numberOfConsistentAnswers = 0;
        for (let i = 0; i < arrayOfChosenAnswers.length; i++) {
            if (arrayOfChosenAnswers[i].checkID == this.state.card.cardID) {
                numberOfConsistentAnswers += 1
            }
        }


        //Prüft ob alle richtigen Antworten gewählt wurden
        if (numberOfConsistentAnswers == this.state.card.numberOfRightAnswers) {
            //Vergleicht die Anzahl der gewählten Antworten mit der Anzahl die tatsächlich richtig sind
            if (numberOfChosenAnswers == this.state.card.numberOfRightAnswers) {
                // this.state.card.numberOfRightTurns += 1
                this.state.choice = true
            }
            else {
                this.state.choice = false
            }
        }

    }
    _checkTheRightTurnsOfCard = () => {
        //Prüft wie oft die Karte schon richtig beantwortet wurde,
        //bei 3 richtigen Stufen steigt sie ein Level im Karteikartensystem auf
        if (this.state.card.numberOfRightTurns == 3) {
            this.state.card.cardLevel += +1
        }
    }
    //Hole den Index der aktuell veränderten Antwort, speichere im dummyArray ab
    //Mit den Attributen  => Antwort(gedrückt oder nicht)  //  die gesamte Antwort als Item
    _updateAnswerState = (cardState, item) => {
        let indexOfItem = this.state.card.answers.indexOf(item)

        let answer = {
            cardState: cardState,
            item: item
        }
        dummyArray[indexOfItem] = answer

    }









    render() {
        if (this.state.card.length != 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.card.answers}
                        renderItem={({ item }) => (
                            <AnswerListItem
                                answerID={item.answerID}
                                answerText={item.answerText}
                                checkID={item.checkID}
                                item={item}
                                getCardState={this._updateAnswerState}
                            />
                        )}
                        keyExtractor={item => item.answerID}
                        ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._checkChoiceAndSendBack()}>
                        <Icon.Feather name="check" size={50} />
                    </TouchableOpacity>
                </View >

            )
        }
        else {
            return (
                <View>
                    <Text>keine Karte geladen</Text>
                </View>
            )
        }
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    saveButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black'
    }
});