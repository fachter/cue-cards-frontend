import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import FriendListItem from './FriendListItem'
import AddFriendWindow from './AddFriendWindow'
import { InternetConnectionContext } from '../../API/InternetConnection'
import { AntDesign } from '@expo/vector-icons';



export default class FriendsScreen extends React.Component {

    static contextType = InternetConnectionContext

    constructor(props) {
        super(props)

        this.retrieveFriends()

        this.state = {
            addWindowVisibility: false,
            loadFriendsSuccesfull: true,
            friends: [
                {
                    userID: 1111,
                    username: "Philip.B",
                    isOnline: true,
                },
                {
                    userID: 2222,
                    username: "Matze.M",
                    isOnline: false,
                },
                {
                    userID: 3333,
                    username: "Clara.L",
                    isOnline: false,
                },
                {
                    userID: 4444,
                    username: "Darius.W",
                    isOnline: false,
                },
                {
                    userID: 5555,
                    username: "Felix.A",
                    isOnline: true,
                }
            ]
        }
    }

    componentDidMount() {
        this.context.checkIfConnected()
    }


    retrieveFriends() {
        console.log(1)
        try {
            //Abruf der Freundeliste
            this.setState({ loadFriendsSuccesfull: true })
        } catch (error) {
            console.log("Error by loading friendlist:" + error)
            this.setState({ loadFriendsSuccesfull: false })
        }
    }

    _setAddWindowVisibility() {
        if (this.state.addWindowVisibility == true) {
            this.setState({ addWindowVisibility: false })
        } else {
            this.setState({ addWindowVisibility: true })
        }
    }

    render() {
        if (this.context.isConnected === true && this.state.loadFriendsSuccesfull === true) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.friends}
                        keyExtractor={item => item.userID}
                        renderItem={({ item }) => (
                            <FriendListItem
                                item={item} />
                        )}
                        ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                    />
                    <TouchableOpacity style={styles.plusButton} onPress={() => this.setState({ addWindowVisibility: true })} >
                        <AntDesign name="adduser" size={40} color="#008FD3" />
                    </TouchableOpacity>
                    <AddFriendWindow onSetVisibility={this._setAddWindowVisibility.bind(this)} addWindowVisibility={this.state.addWindowVisibility} />
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
});