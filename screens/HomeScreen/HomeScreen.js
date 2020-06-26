import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';


import { Entypo } from '@expo/vector-icons';


import ChooseFolderSetWindow from './ChooseFolderSetWindow'
import FolderListItem from './FolderListItem';

import { ListStructureContext } from './ListStructureProvider'

import SwipeView from '../../components/SwipeView'
import { useNavigation } from '@react-navigation/native';



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
        isFolder,
        setIsFolder,
        CreateFileWindowVisible,
        setCreateFileWindowVisible
    } = React.useContext(ListStructureContext)

    const navigation = useNavigation()


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
        console.log(currentListStructure)
        BackHandler.addEventListener('hardwareBackPress', _backButtonPressed)
    });


    function _getClickedSubfolder(item) {
        updateFolderHistory()
        if (item.isFolder) {
            //durchsucht das Array nach dem Item und ruft die OrdnerStruktur auf
            let indexOfItem = currentListStructure.indexOf(item)
            let subStructure = currentListStructure[indexOfItem].subFolder
            setCurrentListStructure(subStructure)
        } else {
            //durchsucht das Array nach dem Item und ruft die OrdnerStruktur auf
            let indexOfItem = currentListStructure.indexOf(item)
            let subStructure = currentListStructure[indexOfItem].cards
            setCurrentListStructure(subStructure)
        }



        if (item.isFolder == undefined) {
            setIsFolder(null)
        } else if (item.isFolder == true) {
            setIsFolder(true)
        } else {
            setIsFolder(false)
        }
    }

    function _navigateToCardScreen() {
        if (isFolder == false) {
            if (currentListStructure.length > 0) {
                navigation.navigate('CardScreen', { cards: currentListStructure })
            } else {
                alert('Füge deinem Set Karten hinzu um eine Session zu starten')
            }

        }
    }


    return (
        <View style={styles.container}>
            <SwipeView>
                <FlatList
                    data={currentListStructure}
                    keyExtractor={item => item.ID}
                    renderItem={({ item }) => (
                        <FolderListItem
                            getSubFolder={_getClickedSubfolder}
                            item={item}
                            callBackNavigation={_navigateToCardScreen}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                />
                <View>
                    <ChooseFolderSetWindow
                        visible={CreateFileWindowVisible} />
                </View>
                {(isFolder) ? null : <TouchableOpacity style={styles.startSessionButton} onPress={() => _navigateToCardScreen()} >
                    <Entypo name="controller-play" size={50} color="black" />
                </TouchableOpacity>}
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

        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    startSessionButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 90,
        right: 10
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'gray',
        marginVertical: 5
    },

})


