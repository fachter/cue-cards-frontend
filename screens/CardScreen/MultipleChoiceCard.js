import React from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'

import AnswerListItem from './AnswerListItem'


export default class MulitpleChoiceCard extends React.Component {


    state = {
        result: false,  // true/false, je nachdem ob richtig oder falsch beantwortet wurde
        backgroundColor: "#111111",
        answers: this.props.answers

    }

    _checkChoiceAndSendBack = () => {
        this._checkTheChoice()
        setTimeout(() => {
            this.props.getCardBack(this.state.result)
        }, 1000);

    }

    _checkTheChoice = () => {
        const { answers } = this.state
        let numberOfRightSelection = 0

        //prüft wie viele Antworten richtig gewählt wurden
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checkState == true && answers[i].isTrue == true) {
                numberOfRightSelection += 1
            }
        }


        if (numberOfRightSelection == this.props.card.numberOfRightAnswers) {
            this.state.result = true
            this.setState({ result: true })
            this.setState({ backgroundColor: "green" })

        } else {
            this.setState({ result: false })
            this.setState({ backgroundColor: 'red' })


        }
    }

    _updateCheckState = (checkState, item) => {

        item.checkState = checkState
        console.log(this.state.answers)
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <FlatList
                    extraData={this.state.answers}
                    data={this.state.answers}
                    keyExtractor={item => item.answerID}
                    renderItem={({ item }) => (
                        <AnswerListItem
                            item={item}
                            getCardState={this._updateCheckState}
                            checkState={false}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => this._checkChoiceAndSendBack()}>
                    <Icon.Feather name="check" size={50} />
                </TouchableOpacity>
            </View >

        )
    }
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