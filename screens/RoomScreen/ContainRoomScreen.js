import React, {useState, useContext, useEffect } from 'react';
import { TouchableOpacity, Button, StyleSheet, FlatList, View, Text, BackHandler } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import AddSetWindow from './AddSetWindow'
import RoomSetListItem from './RoomSetListItem';
import { Searchbar } from 'react-native-paper';
import Drawer from 'react-native-drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import { CopyPasteContext } from '../HomeScreen/CopyPasteProvider'
import HomeScreen from '../HomeScreen/HomeScreen';
import  {ListStructureContext}   from '../HomeScreen/ListStructureProvider';

export default function ContainRoomScreen() {
    return (
 <SetDataList/>
    )
}

const SetDataList = () =>{
    const {
    setHistoryArray,
    currentSetStructure,
    setCurrentSetStructure,
    updateSetHistory,
    _getLastSetFolderStructure
} = useContext(ListStructureContext)

const initialFriendState = [
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

const initialSets= [
    {
        id: '1',
        set: 'Set'
    }
]


    //static contextType = CopyPasteContext

    const [search, setSearch] = useState('');
    const [showAddSetWindow, setShowAddSetWindow] = useState(false);
    const [friends, setFriends] = useState(initialFriendState)
    //const [sets, setSets] = useState(initialSets)

    


   /*  function updateRoomList() {
        const copyPaste = context
        console.log(copyPaste.copyData)

        let copy = currentSetStructure
        copy.push(copyPaste.copyData)
        setState({ currentSetStructure: copy })
    } */


   /*  useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', _backButtonPressed)
    }, []);

    function _backButtonPressed() {
        //Holt sich die state "isFolder" der Vorherigen Ordnerstruktur

        if (setHistoryArray.length > 0) {
            var lastSetFolderStructure = _getLastSetFolderStructure()
            setCurrentSetStructure(lastSetFolderStructure)
            return true
        } else {
            return false
        }
    }
 */
    

    function _showAddSetWindow() {
        if (showAddSetWindow === false) {
            setShowAddSetWindow(true)
        }
        else if (showAddSetWindow === true) {
            setShowAddSetWindow(false)
        }
    }

    function handleSetAdd(newListItem) {
        const copy = currentSetStructure
        copy.push({ id: copy.length, set: newListItem })
        setCurrentSetStructure(copy)
        setShowAddSetWindow(false)
    }

   /*  function handleAdd(newListItem) {
        let copy = rooms
        copy.push({ ID: copy.length, title: newListItem })
        setRooms(copy)
        setAddRoomWindowVisibility(false)
    } */


    function renderDrawer() {
        //SlideMenu
        //const { search } = state;

        return (
            
                <View style={styles.menuContainer}>
                    <Text style={styles.textStyle}>Freund einladen</Text>
                    <Searchbar
                        placeholder="Freund ID eingeben"
                        //onChangeText={_updateSearch()}
                        value={search}
                    />
                    <FlatList
                        style={{ flex: 1.0 }}
                        data={friends}
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

                </View>
                
        )
    }

    function openDrawer() {
        drawer.open()
    }

    function closeDrawer() {
        drawer.close()
    }


        //const copyPaste = context

        return (
            <Drawer
                ref={(ref) => { drawer = ref }}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.35}
                content={renderDrawer()}
                style={styles.drawer}
                side="right"
            >
                <View style={styles.container}>


                    {/* {copyPaste.someThingIsCopied ? <View style={styles.copyPasteView}>
                        <Text>Einfügen</Text>
                        <Icon.Button
                            name="ios-copy"
                            size={23} color="black"
                            backgroundColor="white"
                            onPress={() => updateRoomList()}
                        />
                        <Icon.Button
                            style={{ alignSelf: 'flex-start' }}
                            name="ios-close"
                            size={23} color="black"
                            backgroundColor="white"
                            onPress={() => copyPaste.setSomeThingIsCopied(false)} />
                    </View> : null} */}


                    <FlatList
                        data={currentSetStructure}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            (
                                <RoomSetListItem
                                    item={item}
                                />
                            )}
                    />
                    {showAddSetWindow ?
                        <AddSetWindow
                            showAddSetWindow={_showAddSetWindow}
                            onAdd={handleSetAdd}

                        /> : null}


                    <TouchableOpacity style={styles.plusButton} onPress={() => setShowAddSetWindow(true)} >
                        <Entypo name="plus" size={45} color="#008FD3" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.friendsButton} onPress={() => openDrawer()} >
                        <Entypo name="users" size={30} color="#008FD3" />

                    </TouchableOpacity>


                </View>
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
        backgroundColor: 'black',
    },

    menuTitle: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf: 'center',
    },
    textStyle: {
        color: 'white'
    },
    copyPasteView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }

})
