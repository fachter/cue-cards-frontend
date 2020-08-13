import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, SectionList, BackHandler } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AddRoomWindow from './AddRoomWindow';
import RoomListItem from './RoomListItem';
import DeleteRoomWindow from './DeleteRoomWindow';
import { Searchbar } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import ContainRoomScreen from './ContainRoomScreen';
import {ListStructureContext} from '../HomeScreen/ListStructureProvider';


const initialRoomState = [
    {
        id: '1',
        title: 'Raum'
    }
]

export default function RoomScreen() {

    return (
        <SetDataList/>
    )
}

    const SetDataList = () => {
        const {
            setHistoryArray,
            currentSetStructure,
            currentListStructure,
            setCurrentSetStructure,
            updateSetHistory,
            _getLastSetFolderStructure
        } = useContext(ListStructureContext)

            const[containRoomScreenVisibility, setContainRoomVisibility] = useState(false);
            const[roomsVisibility, setRoomsVisibility] = useState(false);
            const[addRoomWindowVisibility, setAddRoomWindowVisibility] = useState(false);
            const[deleteWindowVisibility, setDeleteWindowVisibility] =useState(false);
            const[onDeleteItem, setOnDeleteItem] = useState(false);
            const[search, setSearch] = useState('');
            const[rooms, setRooms] = useState(initialRoomState);
            
            



    function handleAdd(newListItem) {
        let copy = rooms
        copy.push({ ID: copy.length, title: newListItem })
        setRooms(copy)
        setAddRoomWindowVisibility(false)
    }

   

    function componentDidUpdate() {
        console.log(rooms)
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


function updateFolderHistory ()  {
    setHistoryArray.push(currentSetStructure)
}

function _getClickedItem(item) {
    let indexOfItem = currentSetStructure.indexOf(item)
    let subStructure = currentSetStructure[indexOfItem]
    setCurrentSetStructure(subStructure)
} 

    function _showContainRoomScreen() {
        setContainRoomVisibility(true)
        setRoomsVisibility(false)
        updateFolderHistory()
        _getClickedItem()
    }


       


    
        //const { search } = state;
        if (containRoomScreenVisibility === false) {
            return (

                <View style={styles.container}>


                    <Text>Gebe die 6-stellige Raum-ID ein, um einem Raum beizutreten

                </Text>

                    <Searchbar
                        placeholder="Raum beitreten"
                        //onChangeText={_updateSearch()}
                        value={search}
                    />

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

                    <TouchableOpacity style={styles.plusButton} onPress={() => setAddRoomWindowVisibility(true)} >
                        <Entypo name="plus" size={50} color="black" />
                    </TouchableOpacity>
                    <AddRoomWindow
                        onSetVisibility={_setRoomAddWindowVisibility}
                        addRoomWindowVisibility={addRoomWindowVisibility}
                        //name={rooms.ti}
                        onAdd={handleAdd}
                    />
                    {deleteWindowVisibility ?
                        <DeleteRoomWindow
                            onDeleteWindow={() => setDeleteWindowVisibility(false)}
                            onDelete={_deleteItemById}
                            item={onDeleteItem}
                        /> : null}
                </View>
            );
        }

        else if (containRoomScreenVisibility === true) {
            return (
                <ContainRoomScreen
                    //showContainRoomScreen={() => setState({ containRoomScreenVisible: true })}
                    
                />
            );
        }





    }




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#595959",
        paddingTop: 30
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
