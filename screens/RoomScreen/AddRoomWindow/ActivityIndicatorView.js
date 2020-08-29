import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default class ActivityIndicatorView extends React.Component {

    render() {
        return (
            <View style={styles.window}>
                {
                    this.props.onResult ?
                        <SimpleLineIcons name="check" size={24} color="green" />
                        :
                        <Feather name="x-circle" size={24} color="red" />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    window: {
        width: '100%',
        height: '30%',
        alignItems: 'center',

    },

});