import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { CardScreenContext } from './CardScreen'

import AnswerListItem from './AnswerListItem'




export default function MulitpleChoiceCard() {


    const { currentCard, _updateCardValues, _getArrayOfTrueAnswers, answers, setAnswers } = useContext(CardScreenContext)
    const [backgroundColor, setBackgroundColor] = useState("#111111")
    const [showNextButton, setShowNextButton] = useState(false)



    function _checkChoiceAndSendBack() {

    }


    function _checkTheChoice() {

        let numberOfRightSelection = 0
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checkState === true && answers[i].isTrue === true) {
                numberOfRightSelection += 1
                console.log(numberOfRightSelection)
            }
        }

        let numberOfChoosenAnswers = 0
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checkState == true) {
                numberOfChoosenAnswers += 1
            }
        }

        if (numberOfRightSelection === currentCard.answers.length && currentCard.answers.length === numberOfChoosenAnswers) {

            setBackgroundColor("green")
            setTimeout(() => {
                _nextCardAndUpdateValues(true)
                setBackgroundColor("#111111")
            }, 1000)

        } else {
            _showTrueAnswers()
            setBackgroundColor("red")
            setShowNextButton(true)
            setTimeout(() => {
                setBackgroundColor("#111111")
            }, 1000)

        }
    }


    function _showTrueAnswers() {
        let copy = answers
        let trueAnswers = _getArrayOfTrueAnswers()

        for (let i = 0; i < copy.length; i++) {
            copy[i].checkState = false
        }

        for (let i = 0; i < copy.length; i++) {
            for (let j = 0; j < trueAnswers.length; j++) {
                if (copy[i].answerValues.id === trueAnswers[j].id) {
                    copy[i].checkState = true
                }
            }
        }
        setAnswers(copy)
    }

    function _nextCardAndUpdateValues(result) {
        _updateCardValues(result)
        setShowNextButton(false)
    }


    function _updateCheckState(checkState, item) {
        item.checkState = checkState
    }


    return (

        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <FlatList
                extraData={answers}
                data={answers}
                keyExtractor={item => item.answerValues.id}
                renderItem={({ item }) => (
                    <AnswerListItem
                        item={item}
                        getCardState={_updateCheckState}
                        checkState={false}

                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
            />
            {showNextButton ?
                <TouchableOpacity style={styles.nextButton} onPress={() => _nextCardAndUpdateValues(false)}>
                    <Text>nächste</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.saveButton} onPress={() => _checkTheChoice()}>
                    <Icon.Feather name="check" size={50} />
                </TouchableOpacity>}
        </View >

    )

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: 'white'
    },
    nextButton: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'green',

    }
});