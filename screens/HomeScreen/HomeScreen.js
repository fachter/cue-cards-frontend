import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';


import { Entypo } from '@expo/vector-icons';



import ChooseFolderSetWindow from './ChooseFolderSetWindow'
import FolderListItem from './FolderListItem';

import { ListStructureContext } from './ListStructureProvider'

import SwipeView from '../../components/SwipeView'







export default function HomeScreen() {
    return (
        <DataList />
    )
}


const DataList = () => {

    const {
        updateFolderHistory,
        listHistoryArray,
        _getLastFolderStructure,
        currentListStructure,
        setCurrentListStructure,
        setIsFolder,
        CreateFileWindowVisible,
        setCreateFileWindowVisible
    } = React.useContext(ListStructureContext)





    function _backButtonPressed() {
        var firstItemOfArray = 0
        var stateOfPrevFolder

        //Holt sich die state "isFolder" der Vorherigen Ordnerstruktur
        if (listHistoryArray.length > 1) {
            stateOfPrevFolder = listHistoryArray[listHistoryArray.length - 2][firstItemOfArray].isFolder

        } else {
            stateOfPrevFolder = true
        }


        var lastFolderStructure = _getLastFolderStructure()
        setCurrentListStructure(lastFolderStructure)
        setIsFolder(stateOfPrevFolder)
        return true
    }



    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', _backButtonPressed)
    });




    function _getClickedSubfolder(item) {
        updateFolderHistory()
        //durchsucht das Array nach dem Item und ruft die OrdnerStruktur auf
        let indexOfItem = currentListStructure.indexOf(item)
        let subStructure = currentListStructure[indexOfItem].subStructure
        setCurrentListStructure(subStructure)


        if (item.isFolder == undefined) {
            setIsFolder(null)
        } else if (item.isFolder == true) {
            setIsFolder(true)
        } else {
            setIsFolder(false)
        }
    }





    return (
        <View style={styles.container}>
            <SwipeView>
                <FlatList
                    data={currentListStructure}
                    //keyExtractor={item => folderarray.name} //key wird für Liste dynamisch erstellt
                    renderItem={({ item }) => (
                        <FolderListItem
                            getSubFolder={_getClickedSubfolder}
                            item={item}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                />
                <View>
                    <ChooseFolderSetWindow
                        visible={CreateFileWindowVisible} />
                </View>
                <TouchableOpacity style={styles.plusButton} onPress={() => setCreateFileWindowVisible(true)} >
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
            </SwipeView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111111",
        paddingTop: 30
    },
    plusButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'gray',
        marginVertical: 5
    },

})


