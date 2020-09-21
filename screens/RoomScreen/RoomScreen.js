import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



import logo from '../../assets/Logo_grau.png';
import home from '../../assets/Home.png';
import newRoom from '../../assets/newRoom.png';

import AddRoomWindow from './AddRoomWindow/AddRoomWindow';
import RoomListItem from './RoomListItem';
import LeaveRoomWindow from './LeaveRoomWindow';
import SwipeView from './../../components/SwipeView'

import { UserContext } from '../LoginRegistrationScreen/UserProvider'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import { asyncAxiosGet } from '../../API/Database'
import { ScrollView } from 'react-native-gesture-handler';



export default function RoomScreen() {

    const { checkIfConnected, isConnected, userToken } = useContext(UserContext)
    const {
        setIsFolder,
        clearFolders,
        setCurrentRoomInfo,
        setCurrentListStructure,
        retrieveDataFromDevice } = useContext(ListStructureContext)


    const [addRoomWindowVisibility, setAddRoomWindowVisibility] = useState(false);
    const [leaveRoomWindowVisibility, SetleaveRoomWindowVisibility] = useState(false);
    const [serverRooms, setServerRooms] = useState([])
    const clickedRoom = useRef(null)
    const roomDataMounted = useRef(false)
    const [serverProblems, setServerProblems] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()


    useEffect(() => {

        navigation.setOptions({ title: 'House Of CueCards' })
        if (roomDataMounted.current === false) {
            updateRooms()
            roomDataMounted.current = true
        }
    })

    function updateRooms() {
        setIsLoading(true)
        checkIfConnected()
            .then(() => {
                asyncAxiosGet('https://cue-cards-app.herokuapp.com/api/get-available-rooms', 'RoomScreen', userToken)
                    .then(res => {
                        setServerRooms(res.data)
                        setIsLoading(false)
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
        await setIsFolder(true) //this.state evlt. nicht benötgit
        await clearFolders()
        if (roomInfo === 'myRoom') {
            loadMyRoomData()
        } else {
            loadNetworkRoomData(roomInfo.data.folders)
        }

        navigation.navigate('Room')
    }


    async function loadMyRoomData() {

        let localData = await retrieveDataFromDevice()

        axios.get("https://cue-cards-app.herokuapp.com/api/get-users-data", {
            headers: {
                'Authorization': "Bearer " + userToken
            }
        }).then(async (res) => {

            let serverData = res

            if (localData === undefined) {
                setCurrentListStructure(serverData.data.folders, false)
            } else {

                let serverDataLatest = ifServerDataTheLatest(serverData, localData)

                if (serverDataLatest === true) {
                    console.log('######### LOAD MY SERVER DATA')
                    console.log(serverData.data.folders)
                    setCurrentListStructure(serverData.data.folders, false)
                } else {
                    console.log('######### LOAD MY LOCAL DATA')
                    console.log(localData.data.folders)


                    setCurrentListStructure(localData.data.folders, true)
                }
            }
        }).catch(() => {
            if (localData.data.folders !== undefined) {
                console.log('######### LOAD MY LOCAL DATA')
                console.log(localData.data.folders)
                setCurrentListStructure(localData.data.folders)
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
        console.log('######### LOAD MY NETWORK DATA')
        console.log(folders)
        setCurrentListStructure(folders, false)

    }



    const renderListFooterComponent = () => {

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
        } else {
            return (
                <View>
                    {isLoading ? <ActivityIndicator style={{ margin: 30 }} size="large" color="#008FD3" /> : null}
                    <TouchableOpacity onPress={() => setAddRoomWindowVisibility(true)}>
                        <Image source={newRoom} style={styles.home} />
                        <Text style={styles.fontStyle}>+ Raum hinzufügen</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }



    return (
        <View style={styles.container}>
            {/* <SwipeView onUpdateRooms={updateRooms}> */}
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView canCancelContentTouches='true'>
                    <TouchableOpacity onPress={() => _navigateToFolderScreen('myRoom')}>
                        <Image source={home} style={styles.home} />
                        <Text style={[styles.fontStyle, { color: 'white', top: 25 }]}>Mein Raum</Text>
                    </TouchableOpacity>
                    <FlatList
                        ListFooterComponent={renderListFooterComponent()}
                        data={serverRooms}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => (
                            <RoomListItem
                                item={item}
                                onLeaveRoomWindowVisibility={showLeaveRoomWindow}
                                onNavigate={_navigateToFolderScreen}
                            />
                        )}

                    />
                    <View style={styles.platzhalter}></View>
                </ScrollView>
            </SafeAreaView>
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
            {/* </SwipeView> */}
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


