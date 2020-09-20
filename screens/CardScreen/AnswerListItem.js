import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class AnswerListItem extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            checkState: false,
            borderColors: {
                checked: 'blue',
                unchecked: 'gray'
            },
            borderWidth: {
                checked: 2,
                unchecked: 0
            }

        }

        this.setBorderColors()
        this.setBoderWith()


    }

    setBoderWith = () => {

        if (this.props.mode === 'answer') {
            this.state.borderWidth = {
                checked: 2,
                unchecked: 0
            }
        } else {
            this.state.borderWidth = {
                checked: 2,
                unchecked: 2
            }
        }
    }

    setBorderColors = () => {

        if (this.props.mode === 'answer') {
            this.state.borderColors = {
                checked: 'blue',
                unchecked: 'gray'
            }
        } else if (this.props.mode === 'solutionTrue') {
            this.state.borderColors = {
                checked: 'green',
                unchecked: 'gray'
            }
        } else if (this.props.mode === 'solutionFalse') {
            this.state.borderColors = {
                checked: 'green',
                unchecked: 'red'
            }
        }
    }



    _checkedUnchecked = () => {
        let checkState = !this.props.item.checkState
        this.props.getCardState(checkState, this.props.item)
    }

    render() {
        this.setBorderColors()
        this.setBoderWith()

        const { borderColors, borderWidth } = this.state
        const { item } = this.props

        return (
            <TouchableOpacity onPress={() => this._checkedUnchecked()}>
                <View style={[styles.container,

                {
                    borderColor: item.checkState == true ? borderColors.checked : borderColors.unchecked,
                    borderWidth: (item.checkState == true ? borderWidth.checked : borderWidth.unchecked)
                }]}>
                    <Text style={{ fontSize: 20, color: 'white' }}>{this.props.item.answerValues.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,

    },
});
