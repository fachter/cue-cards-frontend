import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import logo from '../../assets/Logo_grau.png';
import FriendListItem from './FriendListItem'
import AddFriendWindow from './AddFriendWindow'
import FriendOptionsWindow from './FriendOptionsWindow'

import { InternetConnectionContext } from '../../API/InternetConnection'
import { CopyPasteContext } from '../HomeScreen/CopyPasteProvider'



export default function FriendsScreen() {

    const { checkIfConnected, isConnected } = useContext(InternetConnectionContext)
    const { someThingIsCopied } = useContext(CopyPasteContext)
    const [addWindowVisibility, setAddWindowVisibility] = useState(false)
    const [friendOptionsWindowVisibility, setfriendOptionWindowVisibility] = useState(false)
    const [loadFriendsSuccesfull, setLoadFriendsSuccesfull] = useState(true)
    const [friends, setFriends] = useState([{
        userid: 1111,
        username: "Philip.B",
        isOnline: true,
    },
    {
        userid: 2222,
        username: "Matze.M",
        isOnline: false,
    },
    {
        userid: 3333,
        username: "Clara.L",
        isOnline: false,
    },
    {
        userid: 4444,
        username: "Darius.W",
        isOnline: false,
    },
    {
        userid: 5555,
        username: "Felix.A",
        isOnline: true,
    }])


    useEffect(() => {
        checkIfConnected()
        retrieveFriends()
    })


    function retrieveFriends() {

    }

    function _setAddWindowVisibility() {

    }

    function _setFriendOptionsWindowVisibility() {
        if (friendOptionsWindowVisibility === true) {
            setfriendOptionWindowVisibility(false)
        } else {
            setfriendOptionWindowVisibility(true)
        }
    }


    function sendCardToFriend(userID) {

    }


    if (isConnected === true && loadFriendsSuccesfull === true) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={friends}
                    keyExtractor={item => item.userID}
                    renderItem={({ item }) => (
                        <FriendListItem
                            item={item}
                            onGetFriend={() => sendCardToFriend}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                />
                <TouchableOpacity style={styles.plusButton} onPress={() => setAddWindowVisibility(true)} >
                    <AntDesign name="adduser" size={40} color="#008FD3" />
                </TouchableOpacity>
                <AddFriendWindow onSetVisibility={_setAddWindowVisibility.bind(this)} addWindowVisibility={addWindowVisibility} />
                {friendOptionsWindowVisibility ? <FriendOptionsWindow onSetVisibility={_setFriendOptionsWindowVisibility} /> : null}
                <Image source={logo} style={styles.logo} />
            </View>

        );
    } else {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'white', margin: 10 }}>Hoppala, da ist wohl etwas schief gelaufen</Text>
                <ActivityIndicator size="large" color="white" />
            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'grey'
    },
    plusButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: "grey",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },
});