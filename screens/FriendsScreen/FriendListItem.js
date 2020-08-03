import React from 'react'
import { View, Text, StyleSheet } from 'react-native'



export default class FriendListItem extends React.Component {


    _OnlineOffline() {
        if (this.props.item.isOnline === true) {
            return 'green'
        }
        return 'gray'
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text>{this.props.item.username}</Text>
                    <View style={[styles.onlineState, { backgroundColor: this._OnlineOffline() }]}>

                    </View>
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
        paddingBottom: 10,
        height: 80,


    },
    innerView: {
        flex: 1,
        backgroundColor: '#696969',
        flexDirection: 'row',
        borderRadius: 5
    },
    onlineState: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        alignSelf: 'center',
        position: 'absolute',
        right: 20
    }

});