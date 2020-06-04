import React, { useState, createContext, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

import MultipleChoice from './MultipleChoice'
import Vocable from './Vocable'

import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { useNavigation } from '@react-navigation/native'

const CardCreatorContext = createContext()

export default function CardCreatorScreen() {

    const { currentListStructure, setCurrentListStructure } = useContext(ListStructureContext)

    const [topic, setTopic] = useState('')
    const [questionText, setQuestionText] = useState('')
    const [isVocable, setIsVocable] = useState(false)
    const [solution, setSolution] = useState('') //Lösung des Vocabelkarte
    const [cardID, setcardID] = useState(null)

    const navigation = useNavigation()


    useEffect(() => {
        setcardID(_determineNewID())
    });


    function _determineNewID() {
        return currentListStructure.length
    }

    function _save(answers) {
        let newCard
        if (isVocable) {
            newCard = {
                cardID: cardID,
                cardType: 'Voc',
                questionText: questionText,
                cardLevel: 0,
                numberOfRightTurns: 0,
                solution: solution
            }
        } else {
            newCard = {
                cardID: cardID,
                cardType: 'MC',
                questionText: questionText,
                cardLevel: 0,
                cardTopic: topic,
                numberOfRightTurns: 0,
                numberOfRightAnswers: answers.length - 1,
                answers: answers
            }
        }
        let copy = currentListStructure
        copy.push(newCard)
        setCurrentListStructure(copy)
        navigation.goBack()
    }



    return (
        <CardCreatorContext.Provider value={{
            setSolution: setSolution,
            _save: _save
        }}>
            <View style={styles.container}>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuButtons} onPress={() => setIsVocable(false)}>
                        <Text style={{ textAlign: 'center' }}>Multiplechoice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButtons} onPress={() => setIsVocable(true)}>
                        <Text style={{ textAlign: 'center' }}>Freitext</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={[styles.questionInput, { textAlign: 'center' }]}
                    multiline={true}
                    placeholder="Bitte Frage hier eingeben"
                    onChangeText={text => setQuestionText(text)}>
                </TextInput>
                <View style={styles.cardcomponent}>
                    {isVocable ? <Vocable /> : <MultipleChoice onSave={_save} cardID={cardID} />}
                </View>
            </View>
        </CardCreatorContext.Provider>
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


export { CardCreatorContext }

