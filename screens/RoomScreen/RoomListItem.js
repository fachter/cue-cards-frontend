import React from 'react'
import { View, TouchableOpacity, MaterialCommunityIcons, Text, StyleSheet } from 'react-native'
import DeleteRoomWindow from './DeleteRoomWindow';



export default class RoomListItem extends React.Component {



    render() {
        return (
            <TouchableOpacity
            onLongPress={()=>this.props.onDeleteWindow(this.props.item.title)}
            >
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text>{this.props.item.title}</Text>
                </View>
                    
            </View>
            </TouchableOpacity>
            
           /*  < TouchableOpacity>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        style={styles.folderButton}
                        name="credit-card-multiple-outline"
                        size={25} color="white" />
                    <Text style={styles.fontStyle}>{this.props.item.title}</Text>
                </View>
            </TouchableOpacity> */
    
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