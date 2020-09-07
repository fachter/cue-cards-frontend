import React from 'react'
import { View, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default class SuccesView extends React.Component {


    render() {
        return (
            <View>
                <Text style={{ color: 'white' }}>{this.props.resultMessage}</Text>
                {
                    this.props.resultSucces ?
                        <SimpleLineIcons name="check" size={24} color="green" />
                        :
                        <Feather name="x-circle" size={24} color="red" />
                }
            </View>
        )
    }

}