import React from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'

import AnswerListItem from './AnswerListItem'


export default class MulitpleChoiceCard extends React.Component {


    state = {
        card: this.props.card,
        sessionAnswers: this.props.answers,
        result: false,  // true/false, je nachdem ob richtig oder falsch beantwortet wurde
    }




    _checkChoiceAndSendBack = () => {
        this._checkTheChoice()
        this.props.getCardBack(this.state.result)
    }


    _checkTheChoice = () => {
        const { sessionAnswers } = this.state
        let numberOfRightSelection = 0

        //prüft wie viele Antworten richtig gewählt wurden
        for (let i = 0; i < sessionAnswers.length; i++) {
            if (sessionAnswers[i].checkState == true && sessionAnswers[i].isTrue == true) {
                numberOfRightSelection += 1
            }
        }

        if (numberOfRightSelection == this.state.card.numberOfRightAnswers) {
            this.state.result = true
        } else {
            this.state.result = false
        }
    }


    _updateCheckState = (checkState, item) => {
        item.checkState = checkState
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.answers}
                    keyExtractor={item => item.answerID}
                    renderItem={({ item }) => (
                        <AnswerListItem
                            item={item}
                            getCardState={this._updateCheckState}
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
        flex: 1
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
        backgroundColor: 'black'
    }
});