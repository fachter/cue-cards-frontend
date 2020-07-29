import React from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AddRoomWindow from './AddRoomWindow';
import RoomListItem from './RoomListItem';



export default class RoomScreen extends React.Component {

    constructor(props) {
        super(props)

this.state= {
addRoomWindowVisibility: false,
rooms: [
    {
        id: 1,
        title: "Winf"
    },
    {
        id: 2,
        title: "Wirtschaftsinformatik"
    },
    {
        id: 3,
        title: "Clara und ich"
    }
]
}
    }




    _setRoomAddWindowVisibility() {
        if (this.state.addRoomWindowVisibility == true) {
            this.setState({ addRoomWindowVisibility: false })
        } else {
            this.setState({ addRoomWindowVisibility: true })
        }
    }

    
render() {
        return(
            <View style = {styles.container}>
                <FlatList
                data={this.state.rooms}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                <RoomListItem item={item}/>
                )}
                />
                
                <TouchableOpacity style={styles.plusButton} onPress={() => this.setState({ addRoomWindowVisibility: true })} >
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
                <AddRoomWindow onSetVisibility={this._setRoomAddWindowVisibility.bind(this)} addRoomWindowVisibility={this.state.addRoomWindowVisibility} />
            </View>
            


        );
    
}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
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
    }
});