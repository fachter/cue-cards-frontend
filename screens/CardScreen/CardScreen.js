import React, { useImperativeHandle } from 'react'
import { View, Text, StyleSheet } from 'react-native'




import MultipleChoiceCard from './MultipleChoiceCard'
import VocableCard from './VocableCard'


//Kartentypen:
//  Multiplechoice = 'MC
//  VocableCards = 'Voc'

const cards = [
    {
        cardID: '1',
        cardType: 'MC',
        questionText: 'ich bin eine Frage',
        cardLevel: 2,            // Stufe im Karteikasten
        cardTopic: 'Topic',
        numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
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
        numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
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



export default class CardScreen extends React.Component {
    state = {
        cards: cards,
        currentCardindex: 0
    }





    _getAllAnswersOfSameTopic = (topic) => {
        const { cards } = this.state;

        let answerPool = []

        for (let i = 0; i < cards.length; i++) {    //Druchlaufe alle Karten
            if (i == this.state.currentCardindex) {   //Überspringt eigenen Antworten der Karte
                continue;
            } else {

                if (cards[i].cardType == 'MC' && cards[i].cardTopic == topic) {  //Filtere nach MultipleChoice Karte und dem Topic
                    for (let j = 0; j < cards[i].answers.length; j++) { //Durchlaufe alle Antworten der aktuelle durchlaufenden Karte
                        answerPool.push(cards[i].answers[j])            //Fügt dem Antwortenpool die Antwort hinzu
                    }
                }
            }
        }
        return answerPool
    }




    _updateCards = (result) => {
        if (result) {
            this._updateNumberofRightTurns()
            this._checkTheRightTurnsOfCard()
        }
        this._nextCard()

    }

    _nextCard = () => {
        if (this.state.currentCardindex < this.state.cards.length - 1) {
            this.setState({ currentCardindex: +1 })
        }
    }


    _updateNumberofRightTurns = () => {
        this.state.cards[this.state.currentCardindex].numberOfRightTurns += 1
    }

    _checkTheRightTurnsOfCard = () => {
        //Prüft wie oft die Karte schon richtig beantwortet wurde,
        //bei 3 richtigen Stufen steigt sie ein Level im Karteikartensystem auf
        if (this.state.cards[this.state.currentCardindex].numberOfRightTurns == 3) {
            this.state.cards[this.state.currentCardindex].cardLevel += +1
        }
    }


    _renderTheRightCard = () => {

        //Voc und MC wird wsl. zusammen niemals vorkommen, hier nur für Testzwecke angebracht,
        //
        if (this.state.cards[this.state.currentCardindex].cardType == 'MC') {
            return (
                <MultipleChoiceCard card={this.state.cards[this.state.currentCardindex]} getCardBack={this._updateCards} answerPool={this._getAllAnswersOfSameTopic('Topic')} />
            )
        } else if (this.state.cards[this.state.currentCardindex].cardType == 'Voc')
            return (
                <VocableCard card={this.state.cards[this.state.currentCardindex]} getCardBack={this._updateCards} />
            )
    }



    render() {
        return (

            <View style={styles.container}>
                <View style={styles.questionView}>
                    <View style={styles.cardInfos}>
                        <View style={styles.topic}><Text style={{ color: 'white' }}>{this.state.cards[this.state.currentCardindex].cardTopic}</Text></View>
                        <View style={styles.level}><Text style={{ color: 'white' }}>{this.state.cards[this.state.currentCardindex].cardLevel}</Text></View>
                    </View>
                    <Text style={styles.questionText}>{this.state.cards[this.state.currentCardindex].questionText}</Text>
                </View>
                <View style={styles.answer}>
                    {this._renderTheRightCard()}
                </View>

            </View >

        )
    }
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
