import React, { useImperativeHandle, useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'




import MultipleChoiceCard from './MultipleChoiceCard'
import VocableCard from './VocableCard'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'


//Kartentypen:
//  Multiplechoice = 'MC
//  VocablecurrentListStructure = 'Voc'

const currentListStructure = [
    {
        cardID: '1',
        cardType: 'MC',
        questionText: 'ich bin eine Frage',
        cardLevel: 2,            // Stufe im Karteikasten
        cardTopic: 'Topic',
        numberOfRightAnswers: 2,
        answers: [
            {
                answerID: '1',
                answerText: 'A',
                checkID: '1'   //Stimmt die CheckID mit der CardID über ein so ist dies eine der richtigen Antworten
            },
            {
                answerID: '3',
                answerText: 'C',
                checkID: '1'
            },



        ]
    },
    {
        cardID: '2',
        cardType: 'Voc',
        questionText: 'Auto',
        cardLevel: 3,            // Stufe im Karteikasten
        numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
        solution: 'Car'
    },
    {
        cardID: '4',
        cardType: 'MC',
        questionText: 'ich bin eine Frage',
        cardLevel: 2,            // Stufe im Karteikasten
        cardTopic: 'Topic',
        numberOfRightAnswers: 2,
        answers: [
            {
                answerID: '1',
                answerText: 'MAUS',
                checkID: '1'   //Stimmt die CheckID mit der CardID über ein so ist dies eine der richtigen Antworten
            },
            {
                answerID: '2',
                answerText: 'HUND',
                checkID: '3'
            },

        ]
    },

]



export default function CardScreen({ route }) {


    const { currentListStructure } = useContext(ListStructureContext)
    const [currentCardindex, setCurrentCardindex] = useState(0)



    function _getAllAnswersOfSameTopic() {
        let answerPool = []
        for (let i = 0; i < currentListStructure.length; i++) {    //Druchlaufe alle Karten
            if (i == currentCardindex) {   //Überspringt eigenen Antworten der Karte
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

    function _updateCardValues(result) {

        if (result == true) {
            currentListStructure[currentCardindex].cardLevel += +1
        } else {
            currentListStructure[currentCardindex].cardLevel += -1
        }

        _nextCard()
    }



    function _nextCard() {
        var nextCardIndex = currentCardindex + 1
        if (nextCardIndex <= currentListStructure.length - 1) {
            setCurrentCardindex(nextCardIndex)
        } else {
            alert("Dies war die letzte Karte, hier einen Endscreen einfügen!")
        }

    }




    function _renderTheRightCard() {
        //Voc und MC wird wsl. zusammen niemals vorkommen, hier nur für Testzwecke angebracht,
        if (currentListStructure[currentCardindex].cardType == 'MC') {
            return (
                <MultipleChoiceCard card={currentListStructure[currentCardindex]} getCardBack={_updateCardValues} answerPool={_getAllAnswersOfSameTopic()} />
            )
        } else if (currentListStructure[currentCardindex].cardType == 'Voc')
            return (
                <VocableCard card={currentListStructure[currentCardindex]} getCardBack={_updateCardValues} />
            )
    }




    return (
        <View style={styles.container}>
            <View style={styles.questionView}>
                <View style={styles.cardInfos}>
                    {/* <View style={styles.topic}><Text style={{ color: 'white' }}>{currentListStructure[currentCardindex].cardTopic}</Text></View> */}
                    <View style={styles.level}><Text style={{ color: 'white' }}>{currentListStructure[currentCardindex].cardLevel}</Text></View>
                </View>
                <Text style={styles.questionText}>{currentListStructure[currentCardindex].questionText}</Text>
            </View>
            <View style={styles.answer}>
                {_renderTheRightCard()}
            </View>

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

    }
})
