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
                unchecked: 1
            }
        }
    }

    setBorderColors = () => {

        if (this.props.mode === 'answer') {
            this.state.borderColors = {
                checked: '#008FD3',
                unchecked: 'gray'
            }
        } else if (this.props.mode === 'solutionTrue') {
            this.state.borderColors = {
                checked: '#008000',
                unchecked: '#2f3136'
            }
        } else if (this.props.mode === 'solutionFalse') {
            this.state.borderColors = {
                checked: '#008000',
                unchecked: '#8a0000'
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
                    <Text style={{ fontSize: 17, color: 'white' }}>{this.props.item.answerValues.text}</Text>
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
        minHeight: 80,
        paddingVertical: 7,
    },
});
