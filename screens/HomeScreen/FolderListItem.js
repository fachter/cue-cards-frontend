import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SetVorlage from '../../assets/SetVorlage.png';
import OrdnerVorlage from '../../assets/OrdnerVorlage.png';
import KartenVorlage from '../../assets/KartenVorlage.png';



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
                            <Image source={KartenVorlage} style={styles.stackButton} />
                            <Text style={styles.fontStyle}
                                numberOfLines={1}
                                ellipsizeMode="clip"
                            >{item.questionText}</Text>
                        </View>
                    </TouchableOpacity > : null}
                {this.state.isFolder ?
                    <TouchableOpacity
                        onPress={() => callBackItem(item)}
                        onLongPress={() => onDeleteWindow(item)}>
                        <View style={styles.container}>
                            <Image source={OrdnerVorlage} style={styles.stackButton} />
                            <Text style={styles.fontStyle}
                                numberOfLines={1}
                                ellipsizeMode="clip">{item.name}
                            </Text>
                        </View>
                    </TouchableOpacity> : null}
                {
                    this.state.isSet ?
                        <View style={styles.setItemView}>
                            < TouchableOpacity
                                style={styles.itemInfo}
                                onPress={() => callBackItem(item)}
                                onLongPress={() => onDeleteWindow(item)}>
                                <View style={styles.container}>
                                    <Image source={SetVorlage} style={styles.stackButton} />
                                    <Text style={styles.fontStyle}
                                        numberOfLines={1}
                                        ellipsizeMode="clip">{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.startSessionButton}
                                onPress={() => this.props.onNavigateToSession(item)}>
                                <MaterialCommunityIcons
                                    name="play"
                                    size={30} color="#008FD3" />
                            </TouchableOpacity>
                        </View> : null
                }
            </View >
        )
    }
}



const styles = StyleSheet.create({
    container: {
        padding: 7,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: "center",
    },
    folderButton: {
        marginRight: 0,
        marginLeft: 3,
    },
    stackButton: {
        marginRight: 17,
        marginLeft: 10,
        paddingVertical: 8,
        width: 30,
        height: 40,
        resizeMode: 'contain',
    },
    fontStyle: {
        fontWeight: "bold",
        color: "white",
        marginLeft: 10,
    },
    setItemView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemInfo: {
        flex: 1,
    },
    startSessionButton: {
        flex: 1,
        position: 'absolute',
        right: 30,
        height: 30,
        width: 30,
    }
});








