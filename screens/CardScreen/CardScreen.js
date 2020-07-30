import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'




import MultipleChoiceCard from './MultipleChoiceCard'
import VocableCard from './VocableCard'
import SessionOptionsPage from './SessionOptionsPage'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'



export default function CardScreen({ route, navigation }) {

    const { currentListStructure, storeDataOnDevice } = useContext(ListStructureContext)
    const [currentCardindex, setCurrentCardindex] = useState(0)
    const [currentCard, setCurrentCard] = useState(route.params.card)
    const [mode, setMode] = useState(route.params.mode)
    const [startSession, setStartSession] = useState(false)
    let sessionCards = currentListStructure
    // const [sessionCards, setSessionCards] = useState(currentListStructure)
    const [maxLevelIncluded, setMaxLevelIncluded] = useState(true)
    const [shuffleCards, setShuffleCards] = useState(false)
    //const [cardanswers, setCardanswers] = useState([])
    const maxCardLevel = 6
    const minCardLevel = 0


    function _createRandomAnswers() {

        let answerPool = _getAllAnswersOfSameTopic()
        let maximalAnswers = 4
        let generatedAnswers = []

        if (currentCard.cardType == "MC") {
            //fügt die richtigen Antworten der Karte hinzu
            for (let i = 0; i < currentCard.answers.length; i++) {

                let rightAnswer = {
                    answerValues: currentCard.answers[i],
                    isTrue: true,
                    checkState: false
                }
                generatedAnswers.push(rightAnswer)
            }
            //füllt die Antwortmöglichkeiten bis zur Zahl 4 auf mit zufällig Antworten aus dem Antwortenpool heraus
            for (let i = currentCard.numberOfRightAnswers; i < maximalAnswers; i++) {
                let randomAnswer = _getRandomAnswer(answerPool)
                //Falls das Set zu wenige Karten und somit nicht genügen Antworten zum auffüllen enthält, füllt es die liste mit undifined Objecten auf
                //Diese Objekte werden somit übersprungen
                if (randomAnswer === undefined) {
                    break
                } else {
                    let wrongAnswer = {
                        answerValues: randomAnswer,
                        isTrue: false,
                        checkState: false
                    }
                    generatedAnswers.push(wrongAnswer) // setate der copy nicht den hauptarray
                }
            }
        }

        return generatedAnswers
    }



    function _getAllAnswersOfSameTopic() {
        let answerPool = []
        for (let i = 0; i < currentListStructure.length; i++) {    //Druchlaufe alle Karten
            if (currentListStructure[i].ID == currentCard.ID) {   //Überspringt eigenen Antworten der Karte
                continue;
            } else {
                if (currentListStructure[i].cardType == "MC" && currentListStructure[i].cardTopic == currentListStructure[currentCardindex].cardTopic) {  //Filtere nach MultipleChoice Karte und dem Topic
                    for (let j = 0; j < currentListStructure[i].answers.length; j++) { //Durchlaufe alle Antworten der aktuelle durchlaufenden Karte
                        answerPool.push(currentListStructure[i].answers[j])            //Fügt dem Antwortenpool die Antwort hinzu
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
            if (currentCard.ID == sessionCards[i].ID) {  //Sucht aktuelle im Set nach ID

                //Je nach richtiger oder falscher Antwort wird die Karte Level auf bzw. abgestuft
                if (result == true) {
                    if (sessionCards[i].cardLevel < maxCardLevel) {

                        sessionCards[i].cardLevel += +1
                    }
                } else {
                    if (sessionCards[i].cardLevel > minCardLevel) {

                        sessionCards[i].cardLevel += -1
                    }
                }
                if (mode == "soloCard") {
                    navigation.goBack()
                } else if (mode == "sessionMode") {
                    _nextCard()
                }
                storeDataOnDevice()
            }
        }
    }

    function _nextCard() {
        if (currentCardindex < sessionCards.length - 1) {
            setCurrentCard(sessionCards[currentCardindex + 1])
            setCurrentCardindex(currentCardindex + 1)
        } else {
            alert("Dies war die letzte Karte, hier einen Endscreen einfügen!")
            navigation.goBack()
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

        let answers = _createRandomAnswers()

        //Voc und MC wird wsl. zusammen niemals vorkommen, hier nur für Testzwecke angebracht,
        if (currentCard.cardType == 'MC') {
            return (
                <MultipleChoiceCard card={currentCard} getCardBack={_updateCardValues} answers={_shuffleArray(answers, true)} />
            )
        } else if (currentCard.cardType == 'Voc')
            return (
                <VocableCard card={currentCard} getCardBack={_updateCardValues} />
            )
    }


    function _setSessionOptionsAndStart() {

        if (shuffleCards == true) {
            sessionCards = _shuffleArray(currentListStructure, false)
            setCurrentCard(sessionCards[currentCardindex])

        }

        setStartSession(true)
    }


    function _ifcurrentModeSoloCard() {
        if (mode == "soloCard") {
            return true
        }
        return false
    }


    return (
        <View style={styles.container}>
            {startSession || _ifcurrentModeSoloCard() ?
                <View style={styles.cardScreen}>
                    <View style={styles.questionView}>
                        <View style={styles.cardInfos}>
                            {/* <View style={styles.topic}><Text style={{ color: 'white' }}>{currentListStructure[currentCardindex].cardTopic}</Text></View> */}
                            <View style={styles.level}><Text style={{ color: 'white' }}>{currentCard.cardLevel}</Text></View>
                            <View style={styles.level}><Text style={{ color: 'green' }}>{currentCardindex}</Text></View>
                        </View>
                        <Text style={styles.questionText}>{currentCard.questionText}</Text>
                    </View>
                    <View style={styles.answer}>
                        {_renderTheRightCard()}
                    </View>
                </View>
                :
                <SessionOptionsPage
                    onStartSession={_setSessionOptionsAndStart}
                    onsetMaxLevelIncluded={setMaxLevelIncluded}
                    onsetShuffleCards={setShuffleCards}
                    maxLevelIncluded={maxLevelIncluded}
                    shuffleCards={shuffleCards} />}
        </View >
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    questionView: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionText: {
        fontSize: 20,
        fontStyle: 'italic',
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
        borderWidth: 2,
        borderColor: 'white',
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
