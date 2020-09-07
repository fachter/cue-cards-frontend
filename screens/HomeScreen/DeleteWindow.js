import React, { useContext } from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { CopyPasteContext } from './CopyPasteProvider'

export default class DeleteWindow extends React.Component {

    static contextType = CopyPasteContext

    _checkIfItemIsFolderOrSet() {
        //Im Falle einer Karte -> undifine
        if (this.props.item.isFolder == true || this.props.item.isFolder == false) {
            return true
        }
        return false
    }

    copy(item) {
        const copy = this.context
        copy.copyTheData(item)
        this.props.onDeleteWindow()
    }


    render() {
        const { item, onDeleteWindow, onDelete, onNavigateToCardCreator } = this.props

        return (
            <Modal
                transparent={true}>
                <View style={styles.window}>
                    {/*Löschen*/}
                    <Icon.Button
                        style={styles.normalButton}
                        name="ios-trash"
                        size={30} color="white"
                        backgroundColor="#202225"
                        onPress={() => onDelete(item.id)}
                    />
                    {/*Kopieren*/}
                    <Icon.Button
                        style={styles.normalButton}
                        name="ios-copy"
                        size={23} color="white"
                        backgroundColor="#202225"
                        onPress={() => this.copy(item.id)}
                    />
                    {/*Ausschneiden*/}
                    <Icon.Button
                        style={styles.normalButton}
                        name="ios-cut"
                        size={23} color="white"
                        backgroundColor="#202225"
                        onPress={() => onDelete(item.id)}
                    />
                    {/*Bearbeiten*/}
                    {this._checkIfItemIsFolderOrSet() ? null :
                        <Icon.Button
                            style={styles.normalButton}
                            name="ios-brush"
                            size={25} color="white"
                            backgroundColor="#202225"
                            onPress={() => onNavigateToCardCreator(item, "editMode")}
                        />}
                    {/*Schließen*/}
                    <Icon.Button
                        style={styles.closeButton}
                        name="ios-close"
                        size={35} color="white"
                        backgroundColor="#202225"
                        onPress={() => onDeleteWindow()}
                    />
                </View>

                {/* <View style={styles.background}>
                    <View style={styles.window}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => onDeleteWindow()}>
                            <AntDesign name="closecircleo" size={24} color="white" />
                        </TouchableOpacity>
                        {this._checkIfItemIsFolderOrSet() ? null : <TouchableOpacity style={styles.button} onPress={() => onNavigateToCardCreator(item)} >
                            <Text style={styles.buttonText}>bearbeiten</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
                            <Text style={styles.buttonText}>löschen</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </Modal>

        )
    }
}


const styles = StyleSheet.create({
    window: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 0,
        width: '100%',
        height: 56,
        //borderRadius: 5,
        backgroundColor: '#202225'
    },
    normalbutton: {
        height: 50,
        width: 50,
        color: "white",
        //backgroundColor: 'white'
    },
    closeButton: {
        marginRight: 20,
        marginLeft: 30
    }

});


