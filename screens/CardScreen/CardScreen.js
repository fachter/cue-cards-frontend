import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'


import MultipleChoiceCard from './MultipleAndSingleChoice'
import FreetextCard from './FreetextCard'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { SettingsContext } from '../SettingsScreen/SettingsProvider'

const CardScreenContext = React.createContext()

export default function CardScreen({ route, navigation }) {

    const { storeDataOnDevice } = useContext(ListStructureContext)
    const { maxCardLevel, shuffleCards } = useContext(SettingsContext)
    const [sessionCards, setSessionCards] = useState(route.params.sessionCards)
    const [currentCard, setCurrentCard] = useState(route.params.card)
    const [currentCardindex, setCurrendCardIndex] = useState(0)
    const [answers, setAnswers] = useState(_createRandomAnswers(0))
    const [mode, setMode] = useState(route.params.mode)
    const [maxLevelIncluded, setMaxLevelIncluded] = useState(true)

    const minCardLevel = 0

    function _getArrayOfTrueAnswers() {
        let trueAnswers = []

        for (let i = 0; i < currentCard.answers.length; i++) {
            trueAnswers.push(currentCard.answers[i])
        }
        return trueAnswers
    }


    function _createRandomAnswers(cardIndex) {

        let answerPool = _getAllAnswersOfSameTopic(cardIndex)
        let maximalAnswers = 4
        let generatedAnswers = []

        if (sessionCards
        [cardIndex].cardType === "MC" || sessionCards
        [cardIndex].cardType === "SC") {
            //fügt die richtigen Antworten der Karte hinzu
            for (let i = 0; i < sessionCards
            [cardIndex].answers.length; i++) {
                let rightAnswer = {
                    answerValues: sessionCards
                    [cardIndex].answers[i],
                    isTrue: true,
                    checkState: false
                }
                generatedAnswers.push(rightAnswer)
            }


            //füllt die Antwortmöglichkeiten bis zur Zahl 4 auf mit zufällig Antworten aus dem Antwortenpool heraus
            for (let i = sessionCards
            [cardIndex].answers.length; i < maximalAnswers; i++) {

                let trys = 0
                let randomAnswer

                //wenn 3 mal eine Frage hinzugefügt wird die schon gezogen wurde, bricht das generieren von Fragen ab (zu wenig Fragen vorhanden)
                while (trys < 3) {

                    randomAnswer = _getRandomAnswer(answerPool)

                    //Falls das Set zu wenige Karten und somit nicht genügen Antworten zum auffüllen enthält, füllt es die liste mit undifined Objecten auf
                    //Diese Objekte werden somit übersprungen
                    if (randomAnswer === undefined) {
                        break
                    }

                    //Prüft ob die Antwort schon vorhanden ist
                    let counter = 0
                    for (let j = 0; j < generatedAnswers.length; j++) {
                        if (generatedAnswers[j].answerValues.id != randomAnswer.id) {
                            counter = counter + 1
                        }
                    }
                    //falls nicht wird diese hinzugefügt & While scheilfe wird abgebrochen -> neue Antwort
                    //falls schon wird ein neuer versuch gestartet
                    if (counter === generatedAnswers.length) {
                        let wrongAnswer = {
                            answerValues: randomAnswer,
                            isTrue: false,
                            checkState: false
                        }
                        generatedAnswers.push(wrongAnswer) // setate der copy nicht den hauptarray
                        trys = 3
                    } else {
                        trys = trys + 1
                    }
                }
            }
        }

        return generatedAnswers
    }



    function _getAllAnswersOfSameTopic(cardIndex) {
        let answerPool = []
        for (let i = 0; i < sessionCards.length; i++) {    //Druchlaufe alle Karten
            if (sessionCards[i].id == sessionCards
            [cardIndex].id) {   //Überspringt eigenen Antworten der Karte
                continue;
            } else {
                if ((sessionCards[i].cardType === "MC" || sessionCards[i].cardType === "SC") && sessionCards[i].cardTopic == sessionCards[currentCardindex].cardTopic) {  //Filtere nach MultipleChoice Karte und dem Topic
                    for (let j = 0; j < sessionCards[i].answers.length; j++) { //Durchlaufe alle Antworten der aktuelle durchlaufenden Karte
                        answerPool.push(sessionCards[i].answers[j])            //Fügt dem Antwortenpool die Antwort hinzu
                    }
                }
            }
        }
        return answerPool
    }


    function _getRandomAnswer(answerPool) {

        let min = Math.ceil(0);
        let max = Math.floor(answerPool.length);
        let randomNumber = Math.floor(Math.random() * (max - min)) + min;
        return answerPool[randomNumber]
    }



    function _updateCardValues(result) {
        for (let i = 0; i < sessionCards
            .length; i++) {
            if (currentCard.id == sessionCards
            [i].id) {  //Sucht aktuelle im Set nach id

                //Je nach richtiger oder falscher Antwort wird die Karte Level auf bzw. abgestuft
                if (result === true) {
                    if (sessionCards
                    [i].cardLevel < maxCardLevel) {
                        sessionCards
                        [i].cardLevel += +1
                    }
                } else {
                    if (sessionCards
                    [i].cardLevel > minCardLevel) {
                        sessionCards
                        [i].cardLevel += -1
                    }
                }
                if (mode === "soloCard") {
                    navigation.goBack()
                } else if (mode === "sessionMode") {
                    _nextCard()

                }
                storeDataOnDevice()
            }
        }
    }




    function _shuffleArray(array, createCopyWithReference) {
        let copy
        if (createCopyWithReference === false) {
            copy = JSON.parse(JSON.stringify(array))
        } else {
            copy = array
        }

        var i,
            j,
            temp;
        for (i = copy.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }
        return copy
    }






    function _renderTheRightCard() {
        if (currentCard.cardType == 'MC' || currentCard.cardType == 'SC') {
            return (
                <CardScreenContext.Provider value={{
                    currentCard: currentCard,
                    _updateCardValues: _updateCardValues,
                    _createRandomAnswers: _createRandomAnswers,
                    _shuffleArray: _shuffleArray,
                    _getArrayOfTrueAnswers: _getArrayOfTrueAnswers,
                    answers: answers,
                    setAnswers: setAnswers,


                }}>
                    <MultipleChoiceCard card={currentCard} />
                </CardScreenContext.Provider>
            )
            // } else if (currentCard.cardType === "SC") {
            //     return (
            //         <CardScreenContext.Provider value={{
            //             currentCard: currentCard,
            //             _updateCardValues: _updateCardValues,
            //             _createRandomAnswers: _createRandomAnswers,
            //             _shuffleArray: _shuffleArray,
            //             _getArrayOfTrueAnswers: _getArrayOfTrueAnswers,
            //             answers: answers,
            //             setAnswers: setAnswers

            //         }}>
            //             <SingleChoiceCard card={currentCard} />
            //         </CardScreenContext.Provider >
            //     )
        } else if (currentCard.cardType == 'FT')
            return (
                <FreetextCard card={currentCard} getCardBack={_updateCardValues} />
            )
    }


    function _nextCard() {
        if (currentCardindex < sessionCards
            .length - 1) {
            let nextIndex = 1
            while (sessionCards
            [currentCardindex + nextIndex].cardLevel === maxCardLevel) {
                nextIndex = nextIndex + 1
            }
            setCurrendCardIndex(currentCardindex + nextIndex)
            setCurrentCard(sessionCards
            [currentCardindex + nextIndex])

            let newAnswers = _createRandomAnswers(currentCardindex + nextIndex)
            let shuffleAnswers = _shuffleArray(newAnswers, true)
            setAnswers(shuffleAnswers)

        } else {
            alert("Dies war die letzte Karte, hier einen Endscreen einfügen!")
            navigation.goBack()
        }
    }




    function _ifcurrentModeSoloCard() {
        if (mode == "soloCard") {
            return true
        }
        return false
    }


    return (
        <View style={styles.container}>
            <View style={styles.cardScreen}>
                <View style={styles.questionView}>
                    <View style={styles.cardInfos}>
                        {/* <View style={styles.topic}><Text style={{ color: 'white' }}>{sessionCards[currentCardindex].cardTopic}</Text></View> */}
                        <View style={styles.level}><Text style={{ color: 'white' }}>{currentCard.cardLevel}</Text></View>
                    </View>
                    <Text style={styles.questionText}>{currentCard.questionText}</Text>
                </View>
                <View style={styles.answer}>
                    {_renderTheRightCard()}
                </View>
            </View>
        </View >
    )
}

export { CardScreenContext }



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    questionView: {
        flex: 1,
        backgroundColor: '#2f3136',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionText: {
        flex: 1,
        fontSize: 23,
        color: 'white'
    },
    answer: {
        flex: 4,
        backgroundColor: '#4b5057'

    },

    cardInfos: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        right: 0,

    },
    level: {
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 15,
        width: 30,
        height: 30,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topic: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        width: 80,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardScreen: {
        flex: 1,
    }
})
