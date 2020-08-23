import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, Image, Button, StyleSheet, FlatList, View, Text, BackHandler } from 'react-native';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import AddSetWindow from './AddSetWindow'
import RoomSetListItem from './RoomSetListItem';
import { Searchbar } from 'react-native-paper';
import Drawer from 'react-native-drawer';
import DeleteWindow from '../HomeScreen/DeleteWindow';
import NewCardWindow from '../HomeScreen/NewCardWindow'
import { useNavigation } from '@react-navigation/native';
import SwipeView from '../../components/SwipeView'

import logo from '../../assets/Logo_grau.png';

import { SettingsContext } from '../SettingsScreen/SettingsProvider'

import Icon from 'react-native-vector-icons/Ionicons';
import { CopyPasteContext } from '../HomeScreen/CopyPasteProvider'
import HomeScreen from '../HomeScreen/HomeScreen';
import { RoomListStructureContext } from './RoomListStructureProvider';
import RoomChooseFolderSetWindow from './RoomChooseFolderSetWindow';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddRoomWindow from './AddSetWindow';





export default function ContainRoomScreen({ drawer }) {
    return (
        <SetDataList />
    )
}



const SetDataList = () => {
    const {
        updateFolderHistory,
        listRoomHistoryArray,
        _getLastFolderStructure,
        currentRoomStructure,
        setCurrentRoomStructure,
        isFolder,
        setIsFolder,
        CreateRoomFileWindowVisible,
        setRoomCreateFileWindowVisible,
        CreateRoomNewCardWindowVisible,
        setRoomCreateNewCardWindowVisible,
        setRoomCreateNewRoomWindowVisible,
        isRoom,
        setIsRoom,
        CreateRoomNewRoomWindowVisible,
        itemIndex,
        rooms,
        setRooms,
        setItemIndex,
        ContainRoomVisible,
        setContainRoomVisible,
        storeDataOnDevice,
        retrieveDataFromDevice,
        dataIsLoading,
        setRoomQuery,
        setFulldata,
        getQuery
    } = useContext(RoomListStructureContext)

    const { shuffleCards } = useContext(SettingsContext)

    const { someThingIsCopied, copyData, setSomeThingIsCopied } = useContext(CopyPasteContext)


    const initialRoomFriendState = [
        {
            id: '1',
            title: 'Philip'
        },
        {
            id: '2',
            title: 'Matze'
        },
        {
            id: '3',
            title: 'Darius'
        }
    ]

    const initialFriendState = [
        {
            id: '1',
            title: 'Felix'
        },
        {
            id: '2',
            title: 'Clara'
        }
    ]




    //static contextType = CopyPasteContext

    const navigation = useNavigation()

    const [search, setSearch] = useState('');
    const [showAddSetWindow, setShowAddSetWindow] = useState(false);
    const [roomFriends, setRoomFriends] = useState(initialRoomFriendState)
    const [friends, setFriends] = useState(initialFriendState)
    const [onDeleteItem, setOnDeleteItem] = useState(null)
    const [deleteWindowVisible, SetDeleteWindowVisible] = useState(false)

    const [sideBarOpen, setSideBarOpen] = useState(false)

    //const [sets, setSets] = useState(initialSets)




    /*  function updateRoomList() {
         const copyPaste = context
         console.log(copyPaste.copyData)
 
         let copy = currentListStructure
         copy.push(copyPaste.copyData)
         setState({ currentListStructure: copy })
     } */


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', _backButtonPressed)
    }, []);

    function _backButtonPressed() {
        //Holt sich die state "isFolder" der Vorherigen Ordnerstruktur
       // navigation.navigate('Räume')
         if (listRoomHistoryArray.length > 0) {
            var lastFolderStructure = _getLastFolderStructure()
            setCurrentRoomStructure(lastFolderStructure)
            setIsFolder(true)
            return true
        } else {
            navigation.navigate('Räume')
            //return false
        } 
    }



    function editCard(item) {
        const mode = "editMode"

        if (item.cardType === 'MC') {
            navigation.navigate('MultipleChoice',
                {
                    id: item.id,
                    cardType: item.cardType,
                    questionText: item.questionText,
                    cardLevel: item.cardLevel,
                    cardTopic: item.cardTopic,
                    numberOfRightAnswers: item.numberOfRightAnswers,
                    answers: item.answers,
                    mode: mode
                })
        } else if (item.cardType === 'FT') {
            navigation.navigate('Freetext',
                {
                    id: item.id,
                    cardType: item.cardType,
                    questionText: item.questionText,
                    cardLevel: item.cardLevel,
                    solution: item.solution,
                    mode: mode
                })
        } else if (item.cardType === "SC") {
            navigation.navigate('SingleChoice',
                {
                    id: item.id,
                    cardType: item.cardType,
                    questionText: item.questionText,
                    cardLevel: item.cardLevel,
                    cardTopic: item.cardTopic,
                    answers: item.answers,
                    mode: mode
                })
        }
        SetDeleteWindowVisible(false)
    }


    function _getClickedItem(item) {

        updateFolderHistory()
        if (item.isFolder) {
            //durchsucht das Array nach dem Item und ruft die OrdnerStruktur auf
            let indexOfItem = currentRoomStructure.indexOf(item)
            let subStructure = currentRoomStructure[indexOfItem].subFolders
            setCurrentRoomStructure(subStructure)
        } else {
            //durchsucht das Array nach dem Item und ruft die OrdnerStruktur auf
            let indexOfItem = currentRoomStructure.indexOf(item)
            let subStructure = currentRoomStructure[indexOfItem].cards
            setCurrentRoomStructure(subStructure)
        }

        if (item.isFolder == undefined) {
            setIsFolder(null)
        } else if (item.isFolder == true) {
            setIsFolder(true)
        } else {
            setIsFolder(false)
        }
    }

    function plusButtonClicked() {
        if (isFolder === true) {
            setRoomCreateFileWindowVisible(true)
        } /* else if (isRoom === true){
            setRoomCreateNewRoomWindowVisible(true)
        } */
        else {
            setRoomCreateNewCardWindowVisible(true)
        }
    }

    function createNewCard(roomCardType) {
        if (roomCardType === "MC") {
            navigation.navigate('RoomMultipleChoice', { mode: "createMode", screen: "room", onSave: currentRoomStructure, onSetSave: setCurrentRoomStructure })
        } else if (roomCardType === "SC") {
            navigation.navigate('RoomSingleChoice', { mode: "createMode", screen: "room", onSave: currentRoomStructure, onSetSave: setCurrentRoomStructure })
        } else if (roomCardType === "FT") {
            navigation.navigate('RoomFreetext', { mode: "createMode", screen: "room", onSave: currentRoomStructure, onSetSave: setCurrentRoomStructure })
        }
        setRoomCreateNewCardWindowVisible(false)
        setContainRoomVisible(true)
    }

    function _showAddSetWindow() {
        if (showAddSetWindow === false) {
            setShowAddSetWindow(true)
        }
        else if (showAddSetWindow === true) {
            setShowAddSetWindow(false)
        }
    }


    function _showDeleteWindow(item) {
        setOnDeleteItem(item)
        SetDeleteWindowVisible(true)

    }

    function _navigateToCardScreen(item) {
        navigation.navigate('CardScreen', { card: item, mode: "soloCard" })
    }

    function _navigateToSession(item) {

        let sessionCards = item.cards

        if (shuffleCards === true) {
            sessionCards = _shuffleArray(item.cards)
        }

        if (item.cards.length > 0) {
            setCurrentRoomStructure(item.cards)
            //updateFolderHistory(item.cards)
            navigation.navigate('CardScreen', { mode: "sessionMode", card: item.cards[0], sessionCards: sessionCards })

        } else {
            alert('Füge deinem Set Karten hinzu um eine Session zu starten')
        }
        console.log(item)
    }

    function pasteTheCopiedData() {
        let copy = currentRoomStructure
        copy.push(copyData)
        setCurrentRoomStructure(copy)
    }

    function _deleteItemById(id) {
        var copy = currentRoomStructure
        var index

        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].id === id)
                index = i
        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        setCurrentRoomStructure(copy)
        SetDeleteWindowVisible(false)
    }


    function renderDrawer() {
        //SlideMenu
        //const { search } = state;

        return (
            <>
            <View style={styles.menuContainer}>
                
                <Text style={styles.textStyle}>Freund einladen</Text>
                <Searchbar
                    style={styles.searchBar}
                    placeholder="ID des Freundes"
                    //onChangeText={_updateSearch()}
                    value={search}
                />
                
                <Text style={styles.textStyle}>Freunde im Raum</Text>
                <FlatList
                    style={{ flex: 1.0 }}
                    data={roomFriends}
                    //extraData={state}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.menuTitleContainer}>
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
                    
              {/*   <Divider borderColor="#fff" color="#fff" orientation="center">
                    Divider
                </Divider>; */}
                 <Text style={styles.textStyle}>Aus Freunden hinzufügen</Text>
                <FlatList
                    style={{ flex: 1.0 }}
                    data={friends}
                    //extraData={state}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                            <TouchableOpacity style={styles.menuTitleContainer}>
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.addFriendButton}
                                onPress={() => this.props.onNavigateToSession(item)}>
                                <MaterialCommunityIcons
                                    name="account-plus"
                                    size={30} color="#008FD3" />
                            </TouchableOpacity>
                            </>
                        )
                    }} /> 
                    
                <Button
                title="Schließen"
                onPress={()=> setSideBarOpen(false)}
                ></Button>

            </View>
           </> 
        )
    }


    //const copyPaste = context

    return (
        <Drawer
            open={sideBarOpen}
            type="overlay"
            tapToClose={false}
            openDrawerOffset={0.35}
            content={renderDrawer()}
            style={styles.drawer}
            side="right"
        >
            <View style={styles.container}>


                {someThingIsCopied ? <View style={styles.copyPasteView}>
                    <Text>Einfügen</Text>
                    <Icon.Button
                        name="ios-copy"
                        size={23} color="black"
                        backgroundColor="white"
                        onPress={() => pasteCopiedData()}
                    />
                    <Icon.Button
                        style={{ alignSelf: 'flex-start' }}
                        name="ios-close"
                        size={23} color="black"
                        backgroundColor="white"
                        onPress={() => setSomeThingIsCopied(false)} />
                </View> : null}


                <FlatList
                    data={currentRoomStructure}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        (
                            <RoomSetListItem
                                item={item}
                                callBackItem={_getClickedItem}
                                onDeleteWindow={_showDeleteWindow.bind(this)}
                                onNavigateToCardScreen={_navigateToCardScreen}
                                onNavigateToSession={_navigateToSession}
                            />
                        )}
                />
                <Icon.Button
                    style={{ alignSelf: 'flex-start' }}
                    name="ios-close"
                    size={23} color="black"
                    backgroundColor="white"
                    onPress={() => setSomeThingIsCopied(false)} />
            </View> 
                <SwipeView swipeRight={_backButtonPressed}
                >

            <FlatList
                //data={currentRoomStructure}
                data={currentRoomStructure}
                //data={currentRoomStructure[0]}
                keyExtractor={item => item.id}
                renderItem={({ item}) =>
                    (
                        <RoomSetListItem
                            item={item}
                            callBackItem={_getClickedItem}
                            onDeleteWindow={_showDeleteWindow.bind(this)}
                            onNavigateToCardScreen={_navigateToCardScreen}
                            onNavigateToSession={_navigateToSession}
                        />
                    )}
            />
            </SwipeView>

            {deleteWindowVisible ?
                <DeleteWindow
                    onDeleteWindow={() => SetDeleteWindowVisible(false)}
                    onNavigateToCardCreator={editCard}
                    item={onDeleteItem}
                    onDelete={_deleteItemById} /> : null}

            <RoomChooseFolderSetWindow
                visible={CreateRoomFileWindowVisible}
            />
            <NewCardWindow
                visible={CreateRoomNewCardWindowVisible}
                onNavigateToCardCreator={createNewCard}
                onSetVisibility={setRoomCreateNewCardWindowVisible}
            />
            {/* <AddRoomWindow
            visible={CreateRoomNewRoomWindowVisible}
            /> */}
            <TouchableOpacity style={styles.plusButton} onPress={() => plusButtonClicked()} >
                <Entypo name="plus" size={45} color="#008FD3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.friendsButton} onPress={() => setSideBarOpen(true)} >
                <Entypo name="users" size={30} color="#008FD3" />

            </TouchableOpacity>


        
         </Drawer>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
        paddingTop: 30
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
    friendsButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'grey',
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: "#2f3136",
    },
    menuContainer: {
        flex: 1.0,
        backgroundColor: '#202225',
    },
    cancelButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignSelf: 'flex-start',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuTitle: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf: 'center',
    },
    copyPasteView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    addFriendButton: {
        flex: 1,
        position: 'absolute',
        right: 30,
        height: 30,
        width: 30,
    },
    searchBar: {
        //marginVertical: 15,
        borderRadius: 10,
        color: 'black',
        marginHorizontal: 15,
        fontSize: 15,
        fontStyle: 'italic',
        backgroundColor: '#C7C7C7'
    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },

})
