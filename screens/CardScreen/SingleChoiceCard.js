import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'
import AnswerListItem from './AnswerListItem'
import { CardScreenContext } from './CardScreen'




export default function SingleChoiceCard() {

    const { currentCard, _updateCardValues, _createRandomAnswers, _shuffleArray, _getArrayOfTrueAnswers, answers } = useContext(CardScreenContext)
    const [result, setResult] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState("#111111")


    function _checkChoiceAndSendBack() {
        _checkTheChoice()
        setTimeout(() => {
            _updateCardValues(result)
            setBackgroundColor("#111111")
        }, 1000);
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
            setResult(true)
            setBackgroundColor("green")
        } else {
            //this._showTrueAnswers()
            setResult(false)
            setBackgroundColor("red")
        }
    }



    // _showTrueAnswers() {
    //     const { answers, trueAnswers } = this.state
    //     let copy = answers

    //     for (let i = 0; i < copy.length; i++) {
    //         copy[i].checkState = false
    //     }

    //     for (let i = 0; i < copy.length; i++) {
    //         for (let j = 0; j < trueAnswers.length; j++) {
    //             if (copy[i].answerValues.id === trueAnswers[j].id) {
    //                 copy[i].checkState = true
    //             }
    //         }
    //     }
    //     this.setState({ answers: copy })
    // }

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
            <TouchableOpacity style={styles.saveButton} onPress={() => _checkChoiceAndSendBack()}>
                <Icon.Feather name="check" size={50} />
            </TouchableOpacity>
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
    }
});