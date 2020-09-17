import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Dimensions, Text, StyleSheet, TouchableOpacity, Button, BackHandler, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Drawer from 'react-native-drawer';
import ChooseFolderSetWindow from './ChooseFolderSetWindow'
import FolderListItem from './FolderListItem';
import DeleteWindow from './DeleteWindow'
import NewCardWindow from './NewCardWindow'
import FriendListBarItem from './FriendListBarItem'


import { ListStructureContext } from './ListStructureProvider'
import { CopyPasteContext } from './CopyPasteProvider'
import { SettingsContext } from '../SettingsScreen/SettingsProvider'


import logo from '../../assets/Logo_grau.png';
import Raumbild1 from '../../assets/Raumbild1.png';
import Raumbild2 from '../../assets/Raumbild2.png';
import LeererRaum from '../../assets/LeererRaum.png';


import { YellowBox } from 'react-native';
import FriendListItem from '../FriendsScreen/FriendListItem';
YellowBox.ignoreWarnings(['componentWillReceiveProps'], ['componentWillMount']);



const { width: WidTH } = Dimensions.get('window')

const initialFriendState = [
    {
        id: '1',
        nickName: 'Philip',
        userImage: '../../assets/Passbild.jpg'
    },
    {
        id: '2',
        nickName: 'Matze',
        userImage: '../../assets/Passbild.jpg'

    },
    {
        id: '3',
        nickName: 'Darius',
        userImage: '../../assets/Passbild.jpg'

    }
]

const HomeScreen = () => {

    const {
        currentRoomInfo,
        updateFolderHistory,
        listHistoryArray,
        _getLastFolderStructure,
        currentListStructure,
        setCurrentListStructure,
        isFolder,
        setIsFolder,
        CreateFileWindowVisible,
        setCreateFileWindowVisible,
        CreateNewCardWindowVisible,
        setCreateNewCardWindowVisible,
    } = useContext(ListStructureContext)

    const { someThingIsCopied, copyData, setSomeThingIsCopied, copiedItemIsCard } = useContext(CopyPasteContext)
    const { shuffleCards } = useContext(SettingsContext)


    const navigation = useNavigation()
    const [deleteWindowVisible, SetDeleteWindowVisible] = useState(false)
    const [onDeleteItem, setOnDeleteItem] = useState(null)
    const [sideBarOpen, setSideBarOpen] = useState(false)



    const renderHeaderTitle = () => {

        if (currentRoomInfo) {
            if (currentRoomInfo === 'myRoom') {
                navigation.setOptions({ title: 'Mein Raum' })
                navigation.setOptions({
                    headerLeft: () => (headerLeftButton()),
                })
            } else {
                navigation.setOptions({ title: currentRoomInfo.name })
            }
        }
    }


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', hardwareBackButtonPressed)
    }, []);


    const headerLeftButton = () => {
        console.log(listHistoryArray.length)
        if (listHistoryArray.length > 0) {
            return (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" onPress={() => {
                    _getLastFolderStructure()

                }} />
            )
        } else {
            return (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" onPress={() => { navigation.goBack() }} />
            )
        }
    }



    function hardwareBackButtonPressed() {
        //Holt sich die state "isFolder" der Vorherigen Ordnerstruktur
        if (listHistoryArray.length > 0) {
            _getLastFolderStructure()
            setIsFolder(true)
            return true
        } else {
            return false
        }
    }


    function _getClickedItem(item) {

        updateFolderHistory()
        if (item.isFolder) {
            //durchsucht das Array nach dem Item und ruft die OrdnerStruktur auf
            let indexOfItem = currentListStructure.indexOf(item)
            let subStructure = currentListStructure[indexOfItem].subFolders
            setCurrentListStructure(subStructure, false)
        } else {
            //durchsucht das Array nach dem Item und ruft die OrdnerStruktur auf
            let indexOfItem = currentListStructure.indexOf(item)
            let subStructure = currentListStructure[indexOfItem].cards
            setCurrentListStructure(subStructure, false)
        }

        if (item.isFolder == undefined) {
            setIsFolder(null)
        } else if (item.isFolder == true) {
            setIsFolder(true)
        } else {
            setIsFolder(false)
        }
    }




    function _shuffleArray(array, createCopyWithReference) {
        let copy
        if (createCopyWithReference === false) {
            copy = JSON.parse(JSON.stringify(array))
        } else {
            copy = array
        }

        var i,
            j,
            temp;
        for (i = copy.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }
        return copy
    }

    async function _navigateToSession(item) {

        let sessionCards = item.cards
        if (shuffleCards === true) {
            sessionCards = await _shuffleArray(item.cards, true)
        }

        if (item.cards.length > 0) {
            navigation.navigate('CardScreen', { mode: "sessionMode", card: item.cards[0], sessionCards: sessionCards })

        } else {
            alert('Füge deinem Set Karten hinzu um eine Session zu starten')
        }
    }


    function _navigateToCardScreen(item) {

        navigation.navigate('CardScreen', { card: item, mode: "soloCard", sessionCards: currentListStructure })
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

    function _showDeleteWindow(item) {
        setOnDeleteItem(item)
        SetDeleteWindowVisible(true)

    }


    function _deleteItemById(id) {
        var copy = currentListStructure
        var index

        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].id === id)
                index = i
        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        setCurrentListStructure(copy, true)
        SetDeleteWindowVisible(false)

    }





    function plusButtonClicked() {
        if (isFolder === true) {
            setCreateFileWindowVisible(true)
        } else {
            setCreateNewCardWindowVisible(true)
        }
    }



    function createNewCard(cardType) {

        const params = {
            mode: "createMode",
        }

        if (cardType === "MC") {
            navigation.navigate('MultipleChoice', params)
        } else if (cardType === "SC") {
            navigation.navigate('SingleChoice', params)
        } else if (cardType === "FT") {
            navigation.navigate('Freetext', params)
        }
        setCreateNewCardWindowVisible(false)
    }

    function pasteTheCopiedData() {
        let copy = currentListStructure
        copy.push(copyData)
        setCurrentListStructure(copy, true)
    }


    const renderRoomIsEmptyScreen = () => {

        if (listHistoryArray.length === 0 && currentListStructure.length === 0) {
            return (
                <View style={styles.bildcontainer}>
                    <Image source={LeererRaum} style={styles.leererRaum} />
                </View>
            )
        }
        return null
    }


    const renderDrawer = () => {
        //SlideMenu
        return (
            <View style={styles.menuContainer}>
                <FlatList
                    data={initialFriendState}
                    //extraData={state}
                    renderItem={({ item }) => {
                        <FriendListBarItem
                            item={item}
                        />


                    }} />
                <Button onPress={() => setSideBarOpen(false)}
                    title='Schließen'
                ></Button>
            </View>
        )
    }



    const checkIfCurrentRoomIsMyRoom = () => {
        if (currentRoomInfo === 'myRoom') {
            return true
        }
        return false
    }



    // ################ Auszuführende Methoden vor dem Return: #########################
    renderHeaderTitle()


    return (
        <View style={styles.container}>
            {someThingIsCopied ?
                <View >
                    {(copiedItemIsCard === true && isFolder === false) || (copiedItemIsCard === false) ?
                        <View style={styles.copyPasteView}>
                            <Icon.Button
                                name="ios-copy"
                                size={23} color="black"
                                backgroundColor="white"
                                onPress={() => pasteTheCopiedData()} />
                            <Icon.Button
                                style={{ alignSelf: 'flex-start' }}
                                name="ios-close"
                                size={23} color="black"
                                backgroundColor="white"
                                onPress={() => setSomeThingIsCopied(false)} />
                        </View> :
                        <View style={{ flexDirection: 'row' }}>
                            <Text>kopierte Datei kann hier nicht eingefügt werden</Text>
                            <Icon.Button
                                style={{ alignSelf: 'flex-start' }}
                                name="ios-close"
                                size={23} color="black"
                                backgroundColor="white"
                                onPress={() => setSomeThingIsCopied(false)} />
                        </View>
                    }
                </View>
                :
                null}
            <Image source={Raumbild2} style={styles.obenRechts} />
            <Image source={Raumbild1} style={styles.untenLinks} />

            {checkIfCurrentRoomIsMyRoom() ? null :
                <Drawer
                    // ref={(ref) => { this.drawer = ref }}
                    open={sideBarOpen}
                    type="overlay"
                    tapToClose={false}
                    openDrawerOffset={0.35}
                    content={renderDrawer()}
                    style={styles.drawer}
                    side="right"
                />
            }

            {renderRoomIsEmptyScreen()}
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    // ListFooterComponent={<Text>UNTEN</Text>}
                    data={currentListStructure}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => (
                        <FolderListItem
                            item={item}
                            callBackItem={_getClickedItem}
                            onDeleteWindow={_showDeleteWindow.bind(this)}
                            onNavigateToCardScreen={_navigateToCardScreen}
                            onNavigateToSession={_navigateToSession}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                />
                <View style={styles.platzhalter}></View>
            </SafeAreaView>
            <View>
                <ChooseFolderSetWindow
                    visible={CreateFileWindowVisible}
                />
                <NewCardWindow
                    visible={CreateNewCardWindowVisible}
                    onNavigateToCardCreator={createNewCard}
                    onSetVisibility={setCreateNewCardWindowVisible}
                />
            </View>
            <TouchableOpacity style={styles.plusButton} onPress={() => plusButtonClicked()} >
                <Entypo name="plus" size={45} color="#008FD3" />
            </TouchableOpacity>
            {checkIfCurrentRoomIsMyRoom() ? null :
                <TouchableOpacity style={styles.freundeButton} onPress={() => setSideBarOpen(true)} >
                    <Entypo name="users" size={30} color="#008FD3" />
                </TouchableOpacity>
            }
            <Image source={logo} style={styles.logo} />
            {
                deleteWindowVisible ?
                    <DeleteWindow
                        onDeleteWindow={() => SetDeleteWindowVisible(false)}
                        onNavigateToCardCreator={editCard}
                        item={onDeleteItem}
                        onDelete={_deleteItemById} /> : null
            }
        </View >
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
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
    startSessionButton: {
        height: 45,
        width: 45,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        position: 'absolute',
        bottom: 75,
        right: 20
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'grey',
        marginVertical: 5,
        width: '96%',
        alignSelf: 'center'
    },
    btnNew: {
        width: WidTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginHorizontal: 25
    },
    copyPasteView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },
    untenLinks: {
        position: 'absolute',
        width: '25%',
        height: 70,
        resizeMode: 'stretch',
        bottom: 0,
    },
    obenRechts: {
        position: 'absolute',
        width: '5%',
        height: '20%',
        resizeMode: 'stretch',
        right: 10,
    },
    platzhalter: {
        height: 80,
        width: '100%',
    },
    bildcontainer: {
        flex: 1,
        width: '95%',
        alignSelf: 'flex-end',
        marginTop: '34%',
    },
    leererRaum: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 600,
        maxHeight: 300,
        resizeMode: 'contain',
    },
    freundeButton: {
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
        backgroundColor: 'black',
    },

    menuTitle: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf: 'center',
    },
    menuTitleContainer: {
        flexDirection: "row",
        paddingVertical: 5
    },
    drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    }
})


export default HomeScreen