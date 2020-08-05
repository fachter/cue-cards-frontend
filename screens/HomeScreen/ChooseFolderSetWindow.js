import React, { useState, createContext, useContext, useEffect } from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { ListStructureContext, ListStructureProvider } from './ListStructureProvider'
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'

const FileContext = createContext()


export default function ChooseFolderSetWindow() {
    const { currentListStructure, setCurrentListStructure, isFolder, setCreateFileWindowVisible, CreateFileWindowVisible, storeDataOnDevice } = useContext(ListStructureContext)

    const [newFileName, setNewFileName] = useState(null)
    const [isNewFileFolder, setIsNewFileFolder] = useState(null)


    function _save() {
        let newID = uuid.v1()
        let newListItem = {
            ID: newID,
            isFolder: isNewFileFolder,
            name: newFileName,
            subFolders: [],
            cards: []
        }


        setCreateFileWindowVisible(false)
        _addNewItemToList(newListItem)
    }



    function _addNewItemToList(newListItem) {
        let copy = currentListStructure
        copy.push(newListItem)
        setCurrentListStructure(copy)
        storeDataOnDevice()
    }



    if (isFolder == false) {
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
                        visible={CreateFileWindowVisible}
                        onRequestClose={() => setCreateFileWindowVisible(false)}>
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
                        animationType="slide"
                        transparent={true}
                        visible={CreateFileWindowVisible}
                        onRequestClose={() => setCreateFileWindowVisible(false)}>
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
    const { setCreateFileWindowVisible } = useContext(ListStructureContext)

    function _setFileType(isFolder) {
        setIsNewFileFolder(isFolder)
        setShowFileNameWindow(true)

    }

    if (showFileNameWindow == false) {
        return (
            <View style={styles.background}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setCreateFileWindowVisible(false)}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headingText}>Was möchtest du erstellen?</Text>
                <View style={styles.window}>
                    <TouchableOpacity style={styles.windowButtons} onPress={() => _setFileType(true)}>
                        <Icon.AntDesign name="addfolder" size={50} />
                        <Text style={styles.buttonText}>Ordner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.windowButtons, { marginTop: 20 }]} onPress={() => _setFileType(false)}>
                        <Icon.MaterialCommunityIcons name="cards-variant" size={50} />
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
    const { setCreateFileWindowVisible, isFolder } = useContext(ListStructureContext)
    const { newFileName, setNewFileName, isNewFileFolder, _save } = useContext(FileContext)
    const [save, setSave] = useState(false)

    useEffect(() => {
        if (save) {
            _saveButtonClicked()
        }

    });

    function _saveButtonClicked() {
        if (isFolder == false) {
            setCreateFileWindowVisible(false)
            navigation.navigate('CardCreator', { mode: "createMode" })
            return
        }
        _save()
    }

    return (
        <View style={styles.background}>
            <Text
                style={styles.headingText}>...</Text>
            <TextInput style={styles.fileNameTextInput} onChangeText={text => setNewFileName(text)} ></TextInput>
            <TouchableOpacity onPress={() => setSave(true)} >

                <View style={styles.saveButton}>
                    <Icon.Feather name="check" size={50} />
                </View>
            </TouchableOpacity>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa',
    },
    window: {
        width: '80%',
        height: '20%',
        borderRadius: 5
    },
    windowButtons: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'grey',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 20,
        fontStyle: 'italic'
    },
    buttonText: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10
    },
    fileNameTextInput: {
        width: '80%',
        height: '10%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'grey',
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: 'black',
        padding: 10,
        textAlign: 'center',
    },
    saveButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'green',
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
