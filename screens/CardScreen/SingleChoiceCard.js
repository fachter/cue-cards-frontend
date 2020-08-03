import React from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons'
import AnswerListItem from './AnswerListItem'



export default class SingleChoiceCard extends React.Component {

    state = {
        result: false,  // true/false, je nachdem ob richtig oder falsch beantwortet wurde
        backgroundColor: "grey",
        answers: this.props.answers
    }


    _checkChoiceAndSendBack = () => {
        this._checkTheChoice()
        setTimeout(() => {
            this.props.getCardBack(this.state.result)
        }, 1000);
    }


    _checkTheChoice = () => {
        const { answers } = this.props
        let numberOfRightSelection = 0

        //prüft wie viele Antworten richtig gewählt wurden
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checkState == true && answers[i].isTrue == true) {
                numberOfRightSelection += 1
            }
        }

        if (numberOfRightSelection == this.props.card.answers.length) {
            this.state.result = true
            this.setState({ result: true })
            this.setState({ backgroundColor: "green" })

        } else {
            this.setState({ result: false })
            this.setState({ backgroundColor: 'red' })

        }
    }

    _updateCheckState = (checkstate, item) => {
        let copy = this.state.answers

        // for (let i = 0; i < copy.length; i++) {
        //     if (item.answerValues.ID === copy[i].answerValues.ID) {
        //         console.log(item.answerValues.ID)
        //         copy[i].checkState = true
        //     } else {
        //         copy[i].checkState = false
        //     }
        // }

        for (let i = 0; i < copy.length; i++) {
            copy[i].checkState = false
        }

        this.setState({ answers: copy })
        console.log(copy)
    }


    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <FlatList
                    extraData={this.state.answers}
                    data={this.props.answers}
                    keyExtractor={item => item.answerValues.ID}
                    renderItem={({ item }) => (
                        <AnswerListItem
                            item={item}
                            getCardState={this._updateCheckState}
                            checkState={false}
                            backgroundColor={this.props.backgroundColor}
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
        backgroundColor: 'black'
    }
});