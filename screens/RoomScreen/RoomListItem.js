import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RaumVorlage1 from '../../assets/RaumVorlage1.png';
//import DeleteRoomWindow from './DeleteRoomWindow';



export default class RoomListItem extends React.Component {



    render() {
        return (
            <TouchableOpacity
                onLongPress={() => this.props.onDeleteWindow(this.props.item)}
                onPress={() => this.props.showContainRoomScreen(this.props.item)}
            >
                <View style={styles.container}>
                    {/* <MaterialCommunityIcons
                        style={styles.folderButton}
                        name="account-group-outline"
                        size={25}
                        color="white"
                    /> */}
                    <Text style={styles.fontStyle}>{this.props.item.title}</Text>
                    <Image source={RaumVorlage1} style={styles.home} />
                    <Text style={styles.fontStyle}>{this.props.item.title}</Text>
                </View>
            </TouchableOpacity>



        )
    }
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
    },
    folderButton: {
        marginRight: 20
    },
    fontStyle: {
        position: 'absolute',
        left: 75,
        fontWeight: "bold",
        color: "white",
        fontSize: 20
    },
    home: {
        width: '100%',
        height: 80,
        resizeMode: 'stretch',
    }
});