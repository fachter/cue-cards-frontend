import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList, Button, TouchableOpacity, SectionList, BackHandler } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AddRoomWindow from './AddRoomWindow';
import RoomListItem from './RoomListItem';
import DeleteRoomWindow from './DeleteRoomWindow';
import { Searchbar } from 'react-native-paper';
import uuid from 'react-native-uuid'
import ContainRoomScreen from './ContainRoomScreen';
import {RoomListStructureContext, RoomListStructureProvider} from './RoomListStructureProvider';
import { useNavigation } from '@react-navigation/native';
//import { RoomListStructureContext, RoomListStructureProvider } from './RoomListStructureProvider';
import logo from '../../assets/Logo_grau.png';


 const initialRoomState = [
    {
        id: '1',
        title: 'Raum',
    }
] 

export default function RoomScreen() {

    return (
        <SetDataList />
    )
}

    const SetDataList = () => {
        const {
            setHistoryArray,
            currentSetStructure,
            setCurrentRoomStructure,
            currentRoomStructure,
            currentListStructure,
            setCurrentSetStructure,
            updateSetHistory,
            _getLastSetFolderStructure,
            itemIndex,
            setItemIndex,
            ContainRoomVisible,
            setContainRoomVisible
        } = useContext(RoomListStructureContext)

            const[containRoomScreenVisibility, setContainRoomVisibility] = useState(false);
            const[roomsVisibility, setRoomsVisibility] = useState(false);
            const[addRoomWindowVisibility, setAddRoomWindowVisibility] = useState(false);
            const[deleteWindowVisibility, setDeleteWindowVisibility] =useState(false);
            const[onDeleteItem, setOnDeleteItem] = useState(false);
            const[search, setSearch] = useState('');
            const [rooms, setRooms] = useState(initialRoomState);

            
        const navigation = useNavigation()




    function handleAdd(newListItem) {
        let copy = rooms
        
        copy.push({ ID: copy.length, title: newListItem })

        setRooms(copy)

        setAddRoomWindowVisibility(false)
        //_addNewRoomToList(newRoom)

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







        return (

            <View style={styles.container}>
               


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
                    <Entypo name="plus" size={50} color="#008FD3" />
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
                <Image source={logo} style={styles.logo} />
            </View>
        );
 





}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
        paddingTop: 10
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
});
