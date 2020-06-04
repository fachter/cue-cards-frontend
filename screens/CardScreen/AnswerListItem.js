import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class AnswerListItem extends React.Component {

    state = {
        checked: false
    }


    componentDidUpdate() {
        this.props.getCardState(this.state.checked, this.props.item)
    }


    _checkedUnchecked = () => {
        if (this.state.checked) {
            this.setState({ checked: false })
        } else {
            this.setState({ checked: true })
        }

    }


    render() {
        return (
            <TouchableOpacity onPress={() => { this._checkedUnchecked() }}>
                <View style={[styles.container, { backgroundColor: (this.state.checked == true ? 'green' : '#4b5057') }]}>
                    <Text style={{ fontSize: 20, color: 'white' }}>{this.props.answerText}</Text>
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
