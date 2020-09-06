import React from 'react'
import { View, StyleSheet } from 'react-native'

export default class ActivityIndicatorView extends React.Component {

    render() {
        return (
            <View style={styles.window}>
                {/* <Text style={{ color: 'white' }}>Hallo</Text>
                {
                    this.props.onResult ?
                        <SimpleLineIcons name="check" size={24} color="green" />
                        :
                        <Feather name="x-circle" size={24} color="red" />
                } */}
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