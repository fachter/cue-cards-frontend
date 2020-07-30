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
            friends: [
                {
                    userID: 1111,
                    username: "Philip.B",
                },
                {
                    userID: 2222,
                    username: "Matze.M",
                },
                {
                    userID: 3333,
                    username: "Clara.L",
                },
                {
                    userID: 4444,
                    username: "Darius.W",
                },
                {
                    userID: 5555,
                    username: "Felix.A",
                }
            ]
        }
    }

    componentDidMount() {
        this.context.checkIfConnected()
    }


    retrieveFriends() {

    }

    _setAddWindowVisibility() {
        if (this.state.addWindowVisibility == true) {
            this.setState({ addWindowVisibility: false })
        } else {
            this.setState({ addWindowVisibility: true })
        }
    }

    render() {
        if (this.context.isConnected === true) {
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
                        <AntDesign name="adduser" size={40} color="black" />
                    </TouchableOpacity>
                    <AddFriendWindow onSetVisibility={this._setAddWindowVisibility.bind(this)} addWindowVisibility={this.state.addWindowVisibility} />
                </View>

            );
        } else {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'white', margin: 10 }}>Bitte prüfe deine Internetverbindung</Text>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )
        }
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey'
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'blue'
    },
    plusButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
});