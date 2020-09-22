import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Left } from 'native-base';


export default class FriendListBarItem extends React.Component {

    _OnlineOffline() {
        if (this.props.item.isOnline === true) {
            return '#3CB371'
        }
        return 'gray'
    }

    render() {

        const { item } = this.props

        return (
            <TouchableOpacity style={styles.menuTitleContainer}>
                <Image style={{ width: 35, height: 35, borderRadius: 40, marginLeft: 20 }}
                    source={{ uri: this.props.item.userImage }}>

                </Image>
                <FontAwesome name="circle-o-notch" style={styles.onlineState} size={15} color={this._OnlineOffline()} />
                <Text style={styles.menuTitle}>
                    {this.props.item.nickName}
                </Text>
            </TouchableOpacity>
        )
    }


}

const styles = StyleSheet.create({
    menuTitleContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        alignItems: 'center'
    },
    menuTitle: {
        width: '100%',
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginLeft: 20,
        maxWidth: '65%',
    },
    onlineState: {
        marginLeft: -13,
        marginBottom: -24,
        // height: 17,
        // width: 17,
        // borderRadius: 10,
        // alignSelf: 'center',
        // alignItems: 'center',
    },

})