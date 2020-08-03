

import React, { useState, createContext, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import uuid from 'react-native-uuid'

import MultipleChoice from './MultipleChoice'
import Vocable from './Freetext'
import SingleChoice from './SingleChoice'
import ImagePickerButton from '../../API/ImagePicker'

import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { useNavigation } from '@react-navigation/native'



export default function CardCreatorScreen({ route }) {

    const navigation = useNavigation()
    const { currentListStructure, setCurrentListStructure, storeDataOnDevice } = useContext(ListStructureContext)

    //CardValues
    const [cardID, setcardID] = useState(_isValueNull(route.params.cardID) ? uuid.v1() : route.params.cardID)
    const [cardType, setCardtype] = useState(_isValueNull(route.params.cardType) ? "MC" : route.params.cardType)
    const [questionText, setQuestionText] = useState(_isValueNull(route.params.questionText) ? null : route.params.questionText)
    const [cardLevel, setCardlevel] = useState(_isValueNull(route.params.cardLevel) ? null : route.params.cardLevel)
    const [solution, setSolution] = useState(_isValueNull(route.params.solution) ? null : route.params.solution)
    const [cardTopic, setCardTopic] = useState(_isValueNull(route.params.cardTopic) ? null : route.params.cardTopic)
    const [answers, setAnswers] = useState(_isValueNull(route.params.answers) ? [] : route.params.answers)


    function _isValueNull(value) {

        if (value === undefined) {
            return true
        }
        return false
    }


    useEffect(() => {
        console.log(cardType)
    })


    function _save(MCanswers, SCanswer, solution) {
        console.log(SCanswer)
        let newCard
        if (cardType === "Voc") {
            newCard = {
                cardID: cardID,
                cardType: cardType,
                questionText: questionText,
                cardLevel: 0,    //Beim bearbeiten einer Karte wird das Level zurück auf 0 gesetzt
                solution: solution
            }
        } else if (cardType === "MC") {
            newCard = {
                cardID: cardID,
                cardType: cardType,
                questionText: questionText,
                cardLevel: 0,
                cardTopic: cardTopic,
                numberOfRightAnswers: MCanswers.length,
                answers: answers
            }
        } else if (cardType === "SC") {
            newCard = {
                cardID: cardID,
                cardType: cardType,
                questionText: questionText,
                cardLevel: 0,
                cardTopic: cardTopic,
                answers: answers
            }
        }
        console.log("________________________")
        console.log(newCard)
        let copy = currentListStructure

        if (route.params.mode == "createMode") { // neue Karte erstellen
            copy.push(newCard)
            setCurrentListStructure(copy)

        } else if (route.params.mode == "editMode") {   //alte Karte aktualisieren
            var index
            for (var i = 0; i < copy.length; i++) {
                if (copy[i].ID === id) {
                    index = i
                }
                copy[index] = newCard
            }
        }
        storeDataOnDevice()
        navigation.goBack()
    }



    function renderTheRightComponent() {
        if (cardType === "Voc") {
            return (
                <Vocable onSave={_save} solution={solution} />
            )
        } else if (cardType === "MC") {
            return (
                <MultipleChoice onSave={_save} answers={answers} />
            )
        } else if (cardType === "SC") {
            return (
                <SingleChoice onSave={_save} answers={answers} />
            )
        }
    }

    return (
        <View style={styles.container}>
            <ImagePickerButton />
            <TextInput
                style={[styles.questionInput, { textAlign: 'center' }]}
                multiline={true}
                placeholder="Bitte Frage hier eingeben"
                onChangeText={text => setQuestionText(text)}>
                {questionText}
            </TextInput>
            <View style={styles.cardcomponent}>
                {renderTheRightComponent()}
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    cardcomponent: {
        flex: 8,
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