import React, { useState, createContext, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import uuid from 'react-native-uuid'

import MultipleChoice from './MultipleChoice'
import Vocable from './Vocable'
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





    function _save() {
        let newCard
        if (cardType === "Voc") {
            newCard = {
                ID: cardID,
                cardType: cardType,
                questionText: questionText,
                cardLevel: 0,    //Beim bearbeiten einer Karte wird das Level zurück auf 0 gesetzt
                solution: solution
            }
        } else if (cardType === "MC") {
            newCard = {
                ID: cardID,
                cardType: cardType,
                questionText: questionText,
                cardLevel: 0,
                cardTopic: cardTopic,
                numberOfRightAnswers: answers.length,
                answers: answers
            }
        }

        let copy = currentListStructure

        if (route.params.mode == "createMode") { // neue Karte erstellen
            copy.push(newCard)
            setCurrentListStructure(copy)

        } else if (route.params.mode == "editMode") {   //alte Karte esetzen
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


    function ifCurrentCardVoc() {
        if (cardType === "Voc") {
            return true
        }
        return false

    }

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuButtons} onPress={() => setCardtype("MC")}>
                    <Text style={{ textAlign: 'center' }}>Multiplechoice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButtons} onPress={() => setCardtype("Voc")}>
                    <Text style={{ textAlign: 'center' }}>Freitext</Text>
                </TouchableOpacity>
            </View>
            <ImagePickerButton />
            <TextInput
                style={[styles.questionInput, { textAlign: 'center' }]}
                multiline={true}
                placeholder="Bitte Frage hier eingeben"
                onChangeText={text => setQuestionText(text)}>
                {questionText}
            </TextInput>
            <View style={styles.cardcomponent}>
                {ifCurrentCardVoc() ? <Vocable onSave={_save} /> : <MultipleChoice onSave={_save} answers={answers} />}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        margin: 30,
        borderWidth: 1,
    },
    menuButtons: {
        flex: 1,
        justifyContent: 'center'
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

