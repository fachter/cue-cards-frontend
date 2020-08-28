import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


import logo from '../../assets/Logo_grau.png';
import home from '../../assets/Home.png';
import newRoom from '../../assets/newRoom.png';

import AddRoomWindow from './AddRoomWindow/AddRoomWindow';
import RoomListItem from './RoomListItem';
import DeleteRoomWindow from './DeleteRoomWindow';

import { RoomListStructureContext } from './RoomListStructureProvider';
import { UserContext } from '../LoginRegistrationScreen/UserProvider'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { ScrollView } from 'react-native-gesture-handler';


export default function RoomScreen() {

    return (
        <SetDataList />
    )
}



const SetDataList = () => {
    const {
        rooms,
        setRooms,
        _getLastSetFolderStructure,
    } = useContext(RoomListStructureContext)

    const { checkIfConnected, isConnected, userToken } = useContext(UserContext)
    const {
        setIsLocationMyRoom,
        setCurrentListStructure,
        retrieveDataFromDevice } = useContext(ListStructureContext)


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




    async function _navigateToFolderScreen(isLocationMyRoom, folders) {
        setIsLocationMyRoom(isLocationMyRoom)
        if (isLocationMyRoom === true) {
            await loadMyRoomData()
        } else {
            await loadNetworkRoomData(folders)
        }
        navigation.navigate('Room')
    }



    function loadMyRoomData() {
        axios.get("https://cue-cards-app.herokuapp.com/get-users-data", {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(async (res) => {
            console.log(res.data.folders)
            let serverData = await res.data.folders
            let localData = await retrieveDataFromDevice()

            //vergleiche Datum 
            //Lade Local oder aus dem Netzwerk, je nach letzten Bearbeitungsdatum
            //durch setCurrentListStructure wird im Falle das die Localen Daten aktuller sind
            //die Daten auf dem Server sofort geupdatet 

            setCurrentListStructure(serverData)
        })
    }


    function loadNetworkRoomData(folders) {
        setCurrentListStructure(folders)
    }




    function renderRoomsFromServer() {
        if (isConnected === true) {
            return (
                <View>
                    <ScrollView>
                        <FlatList
                            data={rooms}
                            keyExtractor={item => item.ID}
                            renderItem={({ item }) => (
                                <RoomListItem
                                    item={item}
                                    onDeleteWindow={_showDeleteWindow}
                                    onNavigate={_navigateToFolderScreen}
                                />
                            )}
                        />
                    </ScrollView>
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
            <TouchableOpacity onPress={() => _navigateToFolderScreen(true, null)}>
                <Image source={home} style={[styles.home, { marginTop: -10 }]} />
                <Text style={[styles.fontStyle, { color: 'white', top: 25 }]}>Mein Raum</Text>
            </TouchableOpacity>
            {renderRoomsFromServer()}
            <TouchableOpacity onPress={() => setAddRoomWindowVisibility(true)}>
                <Image source={newRoom} style={styles.home} />
                <Text style={styles.fontStyle}>+ Raum hinzufügen</Text>
            </TouchableOpacity>
            <AddRoomWindow
                onSetVisibility={_setRoomAddWindowVisibility}
                addRoomWindowVisibility={addRoomWindowVisibility}
                onAdd={handleAdd}
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
        height: 90,
        resizeMode: 'stretch',
        //marginTop: -10
    },
    fontStyle: {
        position: 'absolute',
        left: 75,
        top: 33,
        fontWeight: "bold",
        color: "#008FD3",
        fontSize: 20
    },
});
