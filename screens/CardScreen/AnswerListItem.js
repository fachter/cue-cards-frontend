import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class AnswerListItem extends React.Component {

    state = {
        checkState: false
    }



    componentDidUpdate() {
        this.props.getCardState(this.state.checkState, this.props.item)
    }


    _checkedUnchecked = () => {
        if (this.state.checkState) {
            this.setState({ checkState: false })
        } else {
            this.setState({ checkState: true })
        }

    }


    render() {
        return (
            <TouchableOpacity onPress={() => { this._checkedUnchecked() }}>
                <View style={[styles.container, { backgroundColor: (this.state.checkState == true ? 'green' : '#4b5057') }]}>
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
