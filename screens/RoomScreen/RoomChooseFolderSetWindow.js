import React, { useState, createContext, useContext, useEffect } from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import { RoomListStructureContext } from './RoomListStructureProvider';

const FileContext = createContext()


export default function RoomChooseFolderSetWindow() {
    const { currentRoomStructure, setCurrentRoomStructure, isRoomFolder, setRoomCreateFileWindowVisible, CreateRoomFileWindowVisible, storeRoomDataOnDevice } = useContext(RoomListStructureContext)
    const [newFileName, setNewFileName] = useState(null)
    const [isNewFileFolder, setIsNewFileFolder] = useState(null)


    function _save() {
        let newid = uuid.v1()
        let newListItem = {
            id: newid,
            isRoomFolder: isNewFileFolder,
            name: newFileName,
            subFolders: [],
            cards: []
        }


        setRoomCreateFileWindowVisible(false)
        _addNewSetItemTolist(newListItem)
    }

    function _addNewSetItemTolist(newListItem) {
        let copy = currentRoomStructure
        console.log(copy)

        currentRoomStructure.push(newListItem)
    }



    if (isRoomFolder == false) {
        return (
            <FileContext.Provider value={{
                setNewFileName: setNewFileName,
                isNewFileFolder: isNewFileFolder,
                _save: _save
            }}>
                <View style={styles.container} >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={CreateRoomFileWindowVisible}
                        onRequestClose={() => setRoomCreateFileWindowVisible(false)}>
                        <FileNameWindow />
                    </Modal>
                </View>
            </FileContext.Provider>
        )
    } else {
        return (
            <FileContext.Provider value={{
                setNewFileName: setNewFileName,
                setIsNewFileFolder: setIsNewFileFolder,
                _save: _save

            }}>
                <View style={styles.container} >
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={CreateRoomFileWindowVisible}
                        onRequestClose={() => setRoomCreateFileWindowVisible(false)}>
                        <CreateFolderOrSet />
                    </Modal>
                </View>
            </FileContext.Provider>
        )
    }
}


function CreateFolderOrSet() {
    const [showFileNameWindow, setShowFileNameWindow] = useState(false)
    const { setIsNewFileFolder } = useContext(FileContext)
    const {setRoomCreateFileWindowVisible } = useContext(RoomListStructureContext)

    function _setFileType(isRoomFolder) {
        setIsNewFileFolder(isRoomFolder)
        setShowFileNameWindow(true)

    }

    if (showFileNameWindow == false) {
        return (
            <View style={styles.background}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setRoomCreateFileWindowVisible(false)}>
                    <AntDesign name="closecircleo" size={24} color="grey" />
                </TouchableOpacity>
                <Text style={styles.headingText}>Was möchtest du erstellen?</Text>
                <View style={styles.window}>
                    <TouchableOpacity style={styles.windowButtons} onPress={() => _setFileType(true)}>
                        <Icon.AntDesign name="addfolder" size={35} color='#008FD3' />
                        <Text style={styles.buttonText}>Ordner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.windowButtons]} onPress={() => _setFileType(false)}>
                        <Icon.MaterialCommunityIcons name="cards-variant" size={35} color='#008FD3' />
                        <Text style={styles.buttonText}>Set</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <FileNameWindow />
        )
    }

}



function FileNameWindow() {

    const navigation = useNavigation()
    const { setRoomCreateFileWindowVisible, isRoomFolder } = useContext(RoomListStructureContext)
    const { newFileName, setNewFileName, isNewFileFolder, _save } = useContext(FileContext)
    const [save, setSave] = useState(false)

    useEffect(() => {
        if (save) {
            _saveButtonClicked()
        }

    });

    function _saveButtonClicked() {
        if (isRoomFolder == false) {
            setRoomCreateFileWindowVisible(false)
            navigation.navigate('CardCreator', { mode: "createMode" })
            return
        }
        _save()
    }

    return (
        <View style={styles.background}>
            <Text
                style={styles.headingText}>Name:</Text>
            <TextInput
                style={styles.fileNameTextInput}
                onChangeText={text => setNewFileName(text)}
                placeholder="z.B. Geschichte"
                placeholderTextColor="grey"
            >
            </TextInput>
            <TouchableOpacity onPress={() => setSave(true)} >

                <View style={styles.saveButton}>
                    <Icon.Feather name="check" size={35} color="#008FD3" />
                </View>
            </TouchableOpacity>
        </View>
    )
}




const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'red'
    //},
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.9
    },
    window: {
        width: '80%',
        height: '15%',
        flexDirection: 'row',
        borderRadius: 5
    },
    windowButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 23,
    },
    buttonText: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10,
        color: 'white'
    },
    fileNameTextInput: {
        width: '85%',
        borderRadius: 5,
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: '#202225',
        padding: 10,
        margin: 5
    },
    saveButton: {
        height: 50,
        width: 50,
        borderRadius: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        borderWidth: 1,
        borderColor: 'grey',
    },
    cancelButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignSelf: 'flex-end',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
