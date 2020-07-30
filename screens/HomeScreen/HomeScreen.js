import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Dimensions, Text, StyleSheet, TouchableOpacity, BackHandler, AppState } from 'react-native';


import { Entypo } from '@expo/vector-icons';


import ChooseFolderSetWindow from './ChooseFolderSetWindow'
import FolderListItem from './FolderListItem';
import DeleteWindow from './DeleteWindow'

import { ListStructureContext } from './ListStructureProvider'


import SwipeView from '../../components/SwipeView'
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';




const { width: WIDTH } = Dimensions.get('window')


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
        setCreateFileWindowVisible,
        storeDataOnDevice,
        retrieveDataFromDevice,
        dataIsLoading,
        setQuery,
        setFulldata,
        getQuery
    } = useContext(ListStructureContext)





    const navigation = useNavigation()
    const [deleteWindowVisible, SetDeleteWindowVisible] = useState(false)
    const [onDeleteItem, setOnDeleteItem] = useState(null)



    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', _backButtonPressed)

        AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        }
    }, []);




    const _handleAppStateChange = (nextAppState) => {
        console.log(nextAppState)
        if (nextAppState === 'active') {
            retrieveDataFromDevice()
        }
    }






    function _backButtonPressed() {
        //Holt sich die state "isFolder" der Vorherigen Ordnerstruktur

        if (listHistoryArray.length > 0) {
            var lastFolderStructure = _getLastFolderStructure()
            setCurrentListStructure(lastFolderStructure)
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



    function _shuffleArray(cards) {
        // let copy = { ...cards }  erstellt eine Kopie ohne Referenz
        let copy = cards
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


    function _navigateToSession() {
        if (isFolder == false) {
            if (currentListStructure.length > 0) {
                navigation.navigate('CardScreen', { mode: "sessionMode", card: currentListStructure[0] })

            } else {
                alert('Füge deinem Set Karten hinzu um eine Session zu starten')
            }

        }
    }


    function _navigateToCardScreen(item) {
        navigation.navigate('CardScreen', { card: item, mode: "soloCard" })
    }


    function _navigateToCardCreator(item, mode) {

        if (item.cardType = 'MC') {
            navigation.navigate('CardCreator',
                {
                    ID: item.ID,
                    cardType: item.cardType,
                    questionText: item.questionText,
                    cardLevel: item.cardLevel,
                    cardTopic: item.cardTopic,
                    numberOfRightAnswers: item.numberOfRightAnswers,
                    answers: item.answers,
                    mode: mode
                })
        } else if (item.cardType = 'Voc') {
            navigation.navigate('CardCreator',
                {
                    ID: item.ID,
                    cardType: item.cardType,
                    questionText: item.questionText,
                    cardLevel: item.cardLevel,
                    solution: item.solution,
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
            if (copy[i].ID === id)
                index = i
        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        setCurrentListStructure(copy)
        SetDeleteWindowVisible(false)
    }



    function handleSearch(text) {
        setQuery({ getQuery: text })
    }


    function renderHeader() {
        return (
            <Searchbar
                placeholder="Suche"
                onChangeText={handleSearch}
                value={getQuery}
            />
        )
    }



    return (
        <View style={styles.container}>
            <SwipeView swipeRight={_backButtonPressed}
            >
                <FlatList
                    //ListHeaderComponent={renderHeader}
                    data={currentListStructure}
                    keyExtractor={item => item.ID}
                    renderItem={({ item }) => (
                        <FolderListItem
                            item={item}
                            callBackItem={_getClickedItem}
                            onDeleteWindow={_showDeleteWindow.bind(this)}
                            onNavigateToCardScreen={_navigateToCardScreen}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                />
                <View>
                    <ChooseFolderSetWindow
                        visible={CreateFileWindowVisible} />
                </View>
                {isFolder ? null : <TouchableOpacity style={styles.startSessionButton} onPress={() => _navigateToSession()} >
                    <Entypo name="controller-play" size={50} color="black" />
                </TouchableOpacity>}
                <TouchableOpacity style={styles.plusButton} onPress={() => setCreateFileWindowVisible(true)} >
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
            </SwipeView>
            {deleteWindowVisible ?
                <DeleteWindow
                    onDeleteWindow={() => SetDeleteWindowVisible(false)}
                    onNavigateToCardCreator={_navigateToCardCreator}
                    item={onDeleteItem}
                    onDelete={_deleteItemById} /> : null}
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
    btnNew: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginHorizontal: 25
    },
})


