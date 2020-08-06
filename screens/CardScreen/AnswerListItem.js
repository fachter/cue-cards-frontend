import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class AnswerListItem extends React.Component {

    state = {
        checkState: false
    }


    _checkedUnchecked = () => {
        if (this.state.checkState) {
            this.setState({ checkState: false })
        } else {
            this.setState({ checkState: true })
        }

        this.props.getCardState(this.state.checkState, this.props.item)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { this._checkedUnchecked() }}>
                <View style={[styles.container, { backgroundColor: (this.props.item.checkState == true ? 'green' : this.props.backgroundColor) }]}>
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
