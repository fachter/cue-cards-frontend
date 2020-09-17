import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class FriendListBarItem extends React.Component {

    render() {

        const { item } = this.props

        return (
            <TouchableOpacity style={styles.menuTitleContainer}>
                <Image style={{ width: 35, height: 35, borderRadius: 40, borderWidth: 0.2, borderColor: 'white', marginLeft: 20 }}
                    source={this.props.item.userImage}>

                </Image>
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
    }
})