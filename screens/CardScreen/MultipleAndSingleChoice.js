import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { CardScreenContext } from './CardScreen'
import logo from '../../assets/Logo_grau.png';
import AnswerListItem from './AnswerListItem'




export default function MulitpleChoiceCard() {


    const { currentCard, _updateCardValues, _getArrayOfTrueAnswers, answers, setAnswers } = useContext(CardScreenContext)
    const [backgroundColor, setBackgroundColor] = useState("#2f3136")
    const [showNextButton, setShowNextButton] = useState(false)



    function _checkTheChoice() {
        let numberOfRightSelection = 0
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checkState === true && answers[i].isTrue === true) {
                numberOfRightSelection += 1
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
                setBackgroundColor("#2f3136")
            }, 1000)

        } else {
            _showTrueAnswers()
            setBackgroundColor("red")
            setShowNextButton(true)
            setTimeout(() => {
                setBackgroundColor("#2f3136")
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
        let copy = [...answers]
        if (currentCard.cardType === "SC") {

            for (let i = 0; i < answers.length; i++) {
                if (item.answerValues.id === answers[i].answerValues.id) {
                    copy[i].checkState = true
                } else {
                    copy[i].checkState = false
                }
            } setAnswers(copy)
        } else {
            for (let i = 0; i < answers.length; i++) {
                if (item.answerValues.id === answers[i].answerValues.id) {
                    copy[i].checkState = checkState
                }
            } setAnswers(copy)
        }
    }



    return (

        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <View style={styles.trennlinie}></View>
            <FlatList
                extraData={answers}
                data={answers}
                keyExtractor={item => item.answerValues.id}
                renderItem={({ item }) => (
                    <AnswerListItem
                        item={item}
                        getCardState={_updateCheckState}

                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
            />
            {showNextButton ?
                <TouchableOpacity style={styles.buttons} onPress={() => _nextCardAndUpdateValues(false)}>
                    <Icon.Feather name="arrow-right" size={45} color='#008FD3' />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.buttons} onPress={() => _checkTheChoice()}>
                    <Icon.Feather name="check" size={45} color='#008FD3' />
                </TouchableOpacity>}
            <Image source={logo} style={styles.logo} />
        </View >

    )

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    trennlinie: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#008FD3'
    },
    buttons: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderColor: 'grey',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        bottom: 35,
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'grey',
        width: '94%',
        alignSelf: 'center'
    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },
});