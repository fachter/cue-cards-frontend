import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/Logo_grau.png';
import home from '../../assets/Home.png';
import newRoom from '../../assets/newRoom.png';
import { Entypo } from '@expo/vector-icons';

import AddRoomWindow from './AddRoomWindow';
import RoomListItem from './RoomListItem';
import DeleteRoomWindow from './DeleteRoomWindow';
import ContainRoomScreen from './ContainRoomScreen';

import { RoomListStructureContext } from './RoomListStructureProvider';
import { InternetConnectionContext } from '../../API/InternetConnection'



export default function RoomScreen({ navigation }) {

    return (
        <SetDataList />
    )
}



const SetDataList = () => {
    const {
        rooms,
        setRooms,
        _getLastSetFolderStructure,
        ContainRoomVisible,
    } = useContext(RoomListStructureContext)

    const { checkIfConnected, isConnected } = useContext(InternetConnectionContext)


    const [addRoomWindowVisibility, setAddRoomWindowVisibility] = useState(false);
    const [deleteWindowVisibility, setDeleteWindowVisibility] = useState(false);
    const [onDeleteItem, setOnDeleteItem] = useState(false);
    const navigation = useNavigation()


    useEffect(() => {
        checkIfConnected().then(() => {
            retrieveRoomData()
        })
    })

    function retrieveRoomData() {

    }





    function handleAdd(newListItem) {
        let copy = rooms

        copy.push({ ID: copy.length, title: newListItem })

        setRooms(copy)

        setAddRoomWindowVisibility(false)
        //_addNewRoomToList(newRoom)
    }

    function _showDeleteWindow(item) {
        setOnDeleteItem(item)
        setDeleteWindowVisibility(true)
    }

    function _setRoomAddWindowVisibility() {
        if (addRoomWindowVisibility == true) {
            setAddRoomWindowVisibility(false)
        } else {
            setAddRoomWindowVisibility(true)
        }
    }

    function _deleteItemById(id) {
        const copy = rooms
        var index

        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].id === id)
                index = i

        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        setRooms(copy)
        setDeleteWindowVisibility(false)

    }


    /* 
       function _getClickedItem(item) {
        let indexOfItem = rooms.indexOf(item)
        let subStructure = rooms[indexOfItem]
        setCurrentRoomStructure(subStructure)
    }     */

    function _showContainRoomScreen(item) {
        /*let indexOfItem = rooms.indexOf(item)
        setItemIndex(indexOfItem)
         let copy = rooms[itemIndex].roomsSubFolders
        setRooms(copy) 
        setCurrentRoomStructure(copy) */
        //setCurrentRoomStructure(item.folders)

        navigation.navigate('ContainRoom')
    }



    function tryToJoinRoom(roomID) {


    }



    function renderRoomsFromServer() {
        if (isConnected === true) {
            return (
                <View>
                    <FlatList
                        data={rooms}
                        keyExtractor={item => item.ID}
                        renderItem={({ item }) => (
                            <RoomListItem
                                item={item}
                                onDeleteWindow={_showDeleteWindow}
                                showContainRoomScreen={_showContainRoomScreen}
                            />
                        )}
                    />

                    {deleteWindowVisibility ?
                        <DeleteRoomWindow
                            onDeleteWindow={() => setDeleteWindowVisibility(false)}
                            onDelete={_deleteItemById}
                            item={onDeleteItem}

                        /> : null}

                </View>
            )
        } else {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>

                    <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'white', margin: 10 }}>Prüfe Netzwerkverbindung</Text>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )

        }


    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('MyRoom')}>
                <Image source={home} style={[styles.home, { marginTop: -10 }]} />
                <Text style={[styles.fontStyle, { color: 'white', top: 20 }]}>Mein Raum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddRoomWindowVisibility(true)}>
                <Image source={newRoom} style={styles.home} />
                <Text style={styles.fontStyle}>+ Raum hinzufügen</Text>
            </TouchableOpacity>
            {renderRoomsFromServer()}
            <AddRoomWindow
                onSetVisibility={_setRoomAddWindowVisibility}
                addRoomWindowVisibility={addRoomWindowVisibility}
                onAdd={handleAdd}
                onJoin={tryToJoinRoom}
            />
            <Image source={logo} style={styles.logo} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
        paddingTop: 10,
    },
    suchEingabe: {
        marginVertical: 15,
        borderRadius: 10,
        color: 'black',
        marginHorizontal: 20,
        fontSize: 15,
        fontStyle: 'italic',
        backgroundColor: '#C7C7C7'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    listSeperator: {
        height: 0.4,
        backgroundColor: 'grey',
        marginVertical: 10,
        width: '96%',
        alignSelf: 'center'
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
        borderWidth: 0.5,
        borderColor: 'grey',
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: "#2f3136",
    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },
    home: {
        width: '100%',
        height: 80,
        resizeMode: 'stretch',
        //marginTop: -10
    },
    fontStyle: {
        position: 'absolute',
        left: 75,
        top: 27,
        fontWeight: "bold",
        color: "#008FD3",
        fontSize: 20
    },
});
