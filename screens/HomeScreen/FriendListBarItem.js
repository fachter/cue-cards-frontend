import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class FriendListBarItem extends React.Component {

    render() {


        return(
        <TouchableOpacity style={styles.menuTitleContainer}>
            <Image style={{ width: 30, height: 30, borderRadius: 40, borderWidth: 1, borderColor: 'white', marginLeft: 5 }}
                source={require('../../assets/Passbild.jpg')}>

            </Image>
            <Text style={styles.menuTitle}>
                {item.title}
            </Text>
            <MaterialCommunityIcons
                name="account-plus"
                size={25}
                color='white'
            />
        </TouchableOpacity>
        )
    }


}

