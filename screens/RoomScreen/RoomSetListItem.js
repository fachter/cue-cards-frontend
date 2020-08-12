import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import DeleteRoomWindow from './DeleteRoomWindow';



export default class RoomSetListItem extends React.Component {



    render() {
        return (
            <TouchableOpacity
                onLongPress={() => this.props.onDeleteWindow(this.props.item)}
                onPress={() => this.props.showContainRoomScreen()}
            >
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        style={styles.folderButton}
                        name="cards-outline"
                        size={25}
                        color="white"
                    />
                    <Text style={styles.fontStyle}>{this.props.item.folder}</Text>
                </View>
            </TouchableOpacity>



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