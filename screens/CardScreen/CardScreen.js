import React, { useState, useContext, useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'


import MultipleChoiceCard from './MultipleAndSingleChoice'
import FreetextCard from './FreetextCard'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { SettingsContext } from '../SettingsScreen/SettingsProvider'

const CardScreenContext = React.createContext()


export default function CardScreen({ route, navigation }) {



    const { currentListStructure, setCurrentListStructure } = useContext(ListStructureContext)
    const { maxCardLevel, maxCardLevelIncluded } = useContext(SettingsContext)

    const [sessionCards] = useState(route.params.sessionCards)
    const [currentCard, setCurrentCard] = useState(route.params.card)
    const [currentCardindex, setCurrendCardIndex] = useState(0)
    const [answers, setAnswers] = useState(_createRandomAnswers(0))
    const [mode] = useState(route.params.mode)

    const minCardLevel = 0


    useEffect(() => {
        navigation.setOptions({ title: 'Befragung' })
    })

    function _getArrayOfTrueAnswers() {
        let trueAnswers = []
        for (let i = 0; i < currentCard.answers.length; i++) {
            trueAnswers.push(currentCard.answers[i])
        }
        return trueAnswers
    }





    function _createRandomAnswers(cardIndex) {


        let dependency = []

        if (route.params.mode === "soloCard") {
            dependency = currentCard
        } else if (route.params.mode === "sessionMode") {
            dependency = sessionCards[cardIndex]
        }



        let answerPool = _getAllAnswersOfSameTopic(cardIndex)
        let maximalAnswers = 4
        let generatedAnswers = []



        if (dependency.cardType === "MC" || dependency.cardType === "SC") {
            //fügt die richtigen Antworten der Karte hinzu
            for (let i = 0; i < dependency.answers.length; i++) {
                let rightAnswer = {
                    answerValues: dependency.answers[i],
                    isTrue: true,
                    checkState: false
                }

                generatedAnswers.push(rightAnswer)
            }


            //füllt die Antwortmöglichkeiten bis zur Zahl 4 auf mit zufällig Antworten aus dem Antwortenpool heraus
            for (let i = dependency.answers.length; i < maximalAnswers; i++) {

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

        let shuffleAnswers = _shuffleArray(generatedAnswers, true)

        return shuffleAnswers
    }



    function _getAllAnswersOfSameTopic(cardIndex) {
        let dependency = []

        if (route.params.mode === "soloCard") {
            dependency = currentCard
        } else if (route.params.mode === "sessionMode") {
            dependency = sessionCards[cardIndex]
        }


        let answerPool = []
        for (let i = 0; i < sessionCards.length; i++) {    //Druchlaufe alle Karten
            if (sessionCards[i].id == dependency.id) {   //Überspringt eigenen Antworten der Karte
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


        for (let i = 0; i < sessionCards.length; i++) {
            if (currentCard.id == sessionCards[i].id) {  //Sucht aktuelle im Set nach id

                //Je nach richtiger oder falscher Antwort wird die Karte Level auf bzw. abgestuft
                if (result === true) {
                    if (sessionCards[i].cardLevel < maxCardLevel) {
                        sessionCards[i].cardLevel += 1
                    }
                } else {
                    if (sessionCards[i].cardLevel > minCardLevel) {
                        sessionCards[i].cardLevel -= 1
                    }
                }
                if (mode === "soloCard") {
                    navigation.goBack()
                } else if (mode === "sessionMode") {
                    _nextCard()

                }

                setCurrentListStructure(currentListStructure, true)

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
                    <MultipleChoiceCard context={CardScreenContext} />
                </CardScreenContext.Provider>
            )
        } else if (currentCard.cardType == 'FT')
            return (
                <FreetextCard card={currentCard} getCardBack={_updateCardValues} />
            )
    }


    function _nextCard() {
        if (currentCardindex < sessionCards.length - 1) {
            let nextIndex = 1
            if (maxCardLevelIncluded === false) {
                while (sessionCards[currentCardindex + nextIndex].cardLevel >= maxCardLevel) {
                    nextIndex = nextIndex + 1
                }
            }
            setCurrendCardIndex(currentCardindex + nextIndex)
            setCurrentCard(sessionCards
            [currentCardindex + nextIndex])

            let newAnswers = _createRandomAnswers(currentCardindex + nextIndex)

            setAnswers(newAnswers)

        } else {
            alert("Dies war die letzte Karte, hier einen Endscreen einfügen!")
            navigation.goBack()
        }
    }





    return (
        <View style={styles.container}>
            <View style={styles.questionView}>
                <View style={styles.cardInfos}>
                    <View style={styles.level}><Text style={{ color: 'white' }}>{currentCard.cardLevel}</Text></View>
                </View>
                <ScrollView>
                    <Text style={styles.questionText}>{currentCard.questionText}</Text>
                </ScrollView>
            </View>
            <View style={styles.answer}>
                {_renderTheRightCard()}
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
        alignItems: 'center',
        flexDirection: 'row',
    },
    questionText: {
        flex: 1,
        fontSize: 23,
        color: 'white',
        textAlign: 'center',
        margin: 10
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
})
