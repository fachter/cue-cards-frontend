import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




export default class FolderListItem extends React.Component {


    _renderRightItem = () => {
        const { item } = this.props

        if (item.isFolder == undefined) {
            return (
                < TouchableOpacity onPress={() => this.props.getSubFolder(item)}>
                    <View style={styles.container}>
                        <MaterialCommunityIcons
                            style={styles.folderButton}
                            name="credit-card-multiple-outline"
                            size={25} color="white" />
                        <Text style={styles.fontStyle}>{item.questionText}</Text>
                    </View>
                </TouchableOpacity >
            )
        } else if (item.isFolder == true) {

            return (
                <TouchableOpacity onPress={() => this.props.getSubFolder(item)} >
                    <View style={styles.container}>
                        <Icon.Button
                            style={styles.folderButton}
                            name="ios-folder"
                            size={25} color="white"
                            backgroundColor="#111111"
                        />
                        <Text style={styles.fontStyle}>{item.name}</Text>
                    </View>
                </TouchableOpacity>

            );
        } else {
            return (
                < TouchableOpacity onPress={() => this.props.getSubFolder(item)
                }>
                    <View style={styles.container}>
                        <MaterialCommunityIcons
                            style={styles.folderButton}
                            name="cards-outline"
                            size={25} color="white" />
                        <Text style={styles.fontStyle}>{item.name}</Text>
                    </View>
                </TouchableOpacity >
            )
        }
    }

    render() {
        return (
            <View>
                {this._renderRightItem()}
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