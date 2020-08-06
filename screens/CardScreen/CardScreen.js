import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'




import MultipleChoiceCard from './MultipleChoiceCard'
import FreetextCard from './FreetextCard'
import SingleChoiceCard from './SingleChoiceCard'
import SessionOptionsPage from './SessionOptionsPage'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'

const CardScreenContext = React.createContext()

export default function CardScreen({ route, navigation }) {

    const { currentListStructure, storeDataOnDevice } = useContext(ListStructureContext)
    const [currentCard, setCurrentCard] = useState(route.params.card)
    const [currentCardindex, setCurrendCardIndex] = useState(0)
    const [answers, setAnswers] = useState(_createRandomAnswers(0))
    const [mode, setMode] = useState(route.params.mode)
    const [startSession, setStartSession] = useState(false)
    const [maxLevelIncluded, setMaxLevelIncluded] = useState(true)
    const [shuffleCards, setShuffleCards] = useState(false)
    const maxCardLevel = 6
    const minCardLevel = 0





    function _getArrayOfTrueAnswers() {
        let trueAnswers = []

        for (let i = 0; i < currentCard.answers.length; i++) {
            trueAnswers.push(currentCard.answers[i])
        }
        return trueAnswers
    }


    function _createRandomAnswers(cardIndex) {
        console.log(currentListStructure)
        console.log(cardIndex)
        let answerPool = _getAllAnswersOfSameTopic(cardIndex)
        let maximalAnswers = 4
        let generatedAnswers = []

        if (currentListStructure
        [cardIndex].cardType === "MC" || currentListStructure
        [cardIndex].cardType === "SC") {
            //fügt die richtigen Antworten der Karte hinzu
            for (let i = 0; i < currentListStructure
            [cardIndex].answers.length; i++) {
                let rightAnswer = {
                    answerValues: currentListStructure
                    [cardIndex].answers[i],
                    isTrue: true,
                    checkState: false
                }
                generatedAnswers.push(rightAnswer)
            }


            //füllt die Antwortmöglichkeiten bis zur Zahl 4 auf mit zufällig Antworten aus dem Antwortenpool heraus
            for (let i = currentListStructure
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
        for (let i = 0; i < currentListStructure.length; i++) {    //Druchlaufe alle Karten
            if (currentListStructure[i].id == currentListStructure
            [cardIndex].id) {   //Überspringt eigenen Antworten der Karte
                continue;
            } else {
                if ((currentListStructure[i].cardType === "MC" || currentListStructure[i].cardType === "SC") && currentListStructure[i].cardTopic == currentListStructure[currentCardindex].cardTopic) {  //Filtere nach MultipleChoice Karte und dem Topic
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
        for (let i = 0; i < currentListStructure
            .length; i++) {
            if (currentCard.id == currentListStructure
            [i].id) {  //Sucht aktuelle im Set nach id

                //Je nach richtiger oder falscher Antwort wird die Karte Level auf bzw. abgestuft
                if (result == true) {
                    if (currentListStructure
                    [i].cardLevel < maxCardLevel) {
                        currentListStructure
                        [i].cardLevel += +1
                    }
                } else {
                    if (currentListStructure
                    [i].cardLevel > minCardLevel) {
                        currentListStructure
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

        if (currentCard.cardType == 'MC') {
            return (
                <CardScreenContext.Provider value={{
                    currentCard: currentCard,
                    _updateCardValues: _updateCardValues,
                    _createRandomAnswers: _createRandomAnswers,
                    _shuffleArray: _shuffleArray,
                    _getArrayOfTrueAnswers: _getArrayOfTrueAnswers,
                    answers: answers,
                    setAnswers: setAnswers

                }}>
                    <MultipleChoiceCard card={currentCard} />
                </CardScreenContext.Provider>
            )
        } else if (currentCard.cardType === "SC") {
            return (
                <CardScreenContext.Provider value={{
                    currentCard: currentCard,
                    _updateCardValues: _updateCardValues,
                    _createRandomAnswers: _createRandomAnswers,
                    _shuffleArray: _shuffleArray,
                    _getArrayOfTrueAnswers: _getArrayOfTrueAnswers,
                    answers: answers,
                    setAnswers: setAnswers

                }}>
                    <SingleChoiceCard card={currentCard} />
                </CardScreenContext.Provider >
            )
        } else if (currentCard.cardType == 'FT')
            return (
                <FreetextCard card={currentCard} getCardBack={_updateCardValues} />
            )
    }


    function _nextCard() {
        console.log()
        if (currentCardindex < currentListStructure
            .length - 1) {
            let nextIndex = 1
            while (currentListStructure
            [currentCardindex + nextIndex].cardLevel === maxCardLevel) {
                nextIndex = nextIndex + 1
            }
            setCurrendCardIndex(currentCardindex + nextIndex)
            setCurrentCard(currentListStructure
            [currentCardindex + nextIndex])

            let newAnswers = _createRandomAnswers(currentCardindex + nextIndex)
            let shuffleAnswers = _shuffleArray(newAnswers, true)
            setAnswers(shuffleAnswers)

        } else {
            alert("Dies war die letzte Karte, hier einen Endscreen einfügen!")
            navigation.goBack()
        }
    }


    function _setSessionOptionsAndStart() {
        //Mischt die Karten
        if (shuffleCards == true) {
            currentListStructure
                = _shuffleArray(currentListStructure, false)
            setCurrentCard(currentListStructure
            [currentCardindex])
        }

        //Maximale Kartenlevel abfragen
        if (maxLevelIncluded == false) {
            if (currentCard.cardLevel === maxCardLevel) {
                _nextCard()

            }
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

export { CardScreenContext }



const styles = StyleSheet.create({
    container: {
        flex: 1,
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
