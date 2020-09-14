import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
])
// Warnung vorerst ignorieren, ist ein Problem seitens React-Native



import logo from '../../assets/Logo_grau.png';
import home from '../../assets/Home.png';
import newRoom from '../../assets/newRoom.png';

import AddRoomWindow from './AddRoomWindow/AddRoomWindow';
import RoomListItem from './RoomListItem';
import LeaveRoomWindow from './LeaveRoomWindow';

import { UserContext } from '../LoginRegistrationScreen/UserProvider'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { asyncAxiosGet } from '../../API/Database'



export default function RoomScreen() {

    const { checkIfConnected, isConnected, userToken } = useContext(UserContext)
    const {
        setCurrentRoomInfo,
        setCurrentListStructure,
        retrieveDataFromDevice } = useContext(ListStructureContext)


    const [addRoomWindowVisibility, setAddRoomWindowVisibility] = useState(false);
    const [leaveRoomWindowVisibility, SetleaveRoomWindowVisibility] = useState(false);
    const [serverRooms, setServerRooms] = useState([])
    const clickedRoom = useRef(null)

    ///////////////////////////////////////////////////
    const roomDataMounted = useRef(false)
    const [serverProblems, setServerProblems] = useState(false)

    const navigation = useNavigation()


    useEffect(() => {

        navigation.setOptions({ title: 'House Of CueCards' })

        if (roomDataMounted.current === false) {
            updateRooms()
        }

    })

    function updateRooms() {
        checkIfConnected()
            .then(() => {
                asyncAxiosGet('https://cue-cards-app.herokuapp.com/api/get-available-rooms', 'RoomScreen', userToken)
                    .then(res => {
                        setServerRooms(res.data)
                        roomDataMounted.current = true
                    }).catch(error => {
                        setServerProblems(true)
                        console.log("Fehler beim Laden der Räume " + error)
                    })

            }).catch(err => {
                console.log("Prüfe Netzwerkverbindung: " + err)
            })

    }

    function showLeaveRoomWindow(item) {
        clickedRoom.current = item
        SetleaveRoomWindowVisibility(true)

    }


    function _setRoomAddWindowVisibility() {
        if (addRoomWindowVisibility == true) {
            setAddRoomWindowVisibility(false)
        } else {
            setAddRoomWindowVisibility(true)
        }
    }



    async function _navigateToFolderScreen(roomInfo) {
        await setCurrentRoomInfo(roomInfo)
        if (roomInfo === 'myRoom') {
            await loadMyRoomData()
        } else {
            await loadNetworkRoomData(roomInfo.data.folders)
        }

        navigation.navigate('Room')
    }



    function loadMyRoomData() {
        axios.get("https://cue-cards-app.herokuapp.com/api/get-users-data", {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(async (res) => {

            let serverData = await res
            let localData = await retrieveDataFromDevice()


            let check = await ifServerDataTheLatest(serverData, localData)

            if (check === true) {

                setCurrentListStructure(serverData.data.folders, false)
            } else {
                setCurrentListStructure(localData.data.folders, true)
            }

        })
    }

    function ifServerDataTheLatest(serverData, localData) {

        if (serverData.data.lastModified > localData.data.lastModified) {
            return true
        }
        return false
    }


    function loadNetworkRoomData(folders) {
        setCurrentListStructure(folders, false)
    }


    function renderErrorMessageView() {
        if (isConnected === true && serverProblems === true) {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>

                    <Text style={{ fontSize: 15, fontStyle: 'italic', color: 'white', margin: 8, textAlign: 'center' }}>Es gibt ein Problem beim Verbinden mit dem Server.</Text>
                    <Text style={{ fontSize: 15, fontStyle: 'italic', color: 'white', margin: 8 }}>Bitte probiere es später erneut.</Text>
                </View>
            )
        }
        else if (isConnected === false) {
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
            <ScrollView>
                <TouchableOpacity onPress={() => _navigateToFolderScreen('myRoom')}>
                    <Image source={home} style={styles.home} />
                    <Text style={[styles.fontStyle, { color: 'white', top: 25 }]}>Mein Raum</Text>
                </TouchableOpacity>
                <FlatList
                    data={serverRooms}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <RoomListItem
                            item={item}
                            onLeaveRoomWindowVisibility={showLeaveRoomWindow}
                            onNavigate={_navigateToFolderScreen}
                        />
                    )}
                />
                <TouchableOpacity onPress={() => setAddRoomWindowVisibility(true)}>
                    <Image source={newRoom} style={styles.home} />
                    <Text style={styles.fontStyle}>+ Raum hinzufügen</Text>
                </TouchableOpacity>
                <View style={styles.platzhalter}></View>
            </ScrollView>
            {renderErrorMessageView()}
            <AddRoomWindow
                onSetVisibility={_setRoomAddWindowVisibility}
                addRoomWindowVisibility={addRoomWindowVisibility}
                updateRooms={updateRooms}
            />
            {leaveRoomWindowVisibility ?
                <LeaveRoomWindow
                    onSetVisibility={SetleaveRoomWindowVisibility}
                    onLeaveRoom={showLeaveRoomWindow}
                    item={clickedRoom.current}
                    updateRooms={updateRooms}
                /> : null}

            <Image source={logo} style={styles.logo} />
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
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
    platzhalter: {
        height: 40,
        width: '100%',
    },
});


