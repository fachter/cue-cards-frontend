import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




export default class FolderListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isCard: false,
            isFolder: false,
            isSet: false
        }


        if (this.props.item.isFolder == true) {
            this.state.isFolder = true
        } else if (this.props.item.isFolder == false) {
            this.state.isSet = true
        } else if (this.props.item.isFolder == undefined) {
            this.state.isCard = true
        }

    }



    render() {
        const { item, callBackItem, onNavigateToCardScreen, onDeleteWindow } = this.props

        return (
            <View>
                {this.state.isCard ?
                    < TouchableOpacity
                        onPress={() => onNavigateToCardScreen(item)}
                        onLongPress={() => onDeleteWindow(item)}>
                        <View style={styles.container}>
                            <MaterialCommunityIcons
                                style={styles.folderButton}
                                name="credit-card-multiple-outline"
                                size={25} color="white" />
                            <Text style={styles.fontStyle}>{item.questionText}</Text>
                        </View>
                    </TouchableOpacity > : null}
                {this.state.isFolder ?
                    <TouchableOpacity
                        onPress={() => callBackItem(item)}
                        onLongPress={() => onDeleteWindow(item)}>
                        <View style={styles.container}>
                            <Icon.Button
                                style={styles.folderButton}
                                name="ios-folder"
                                size={25} color="white"
                                backgroundColor="#111111"
                            />
                            <Text style={styles.fontStyle}>{item.name}</Text>
                        </View>
                    </TouchableOpacity> : null}
                {this.state.isSet ?
                    < TouchableOpacity
                        onPress={() => callBackItem(item)}
                        onLongPress={() => onDeleteWindow(item)}>
                        <View style={styles.container}>
                            <MaterialCommunityIcons
                                style={styles.folderButton}
                                name="cards-outline"
                                size={25} color="white" />
                            <Text style={styles.fontStyle}>{item.name}</Text>
                        </View>
                    </TouchableOpacity > : null}

            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: "center"
    },
    folderButton: {
        marginRight: 20
    },
    fontStyle: {
        fontWeight: "bold",
        color: "white"
    },

});








