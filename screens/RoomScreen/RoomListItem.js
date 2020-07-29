import React from 'react'
import { View, Text, StyleSheet } from 'react-native'



export default class RoomListItem extends React.Component {



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text>{this.props.item.title}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 60
    },
    innerView: {
        flex: 1,
        backgroundColor: 'darkgrey'
    }

});