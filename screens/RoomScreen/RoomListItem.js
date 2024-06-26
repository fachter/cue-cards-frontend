import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

import RaumVorlage1 from '../../assets/RaumVorlage1.png';
import RaumVorlage2 from '../../assets/RaumVorlage2.png';
import RaumVorlage3 from '../../assets/RaumVorlage3.png';
import RaumVorlage4 from '../../assets/RaumVorlage4.png';


const pictures = [RaumVorlage1, RaumVorlage2, RaumVorlage3, RaumVorlage4]


export default class RoomListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pictureNumber: this.loadBackgoundPicture()
        }

    }

    loadBackgoundPicture() {
        return pictures[this.props.item.pictureNumber]
    }

    render() {
        const { item } = this.props
        return (
            <TouchableOpacity
                onLongPress={() => this.props.onLeaveRoomWindowVisibility(item)}
                onPress={() => this.props.onNavigate(item)}
            >
                <View style={styles.container}>
                    <Image source={this.state.pictureNumber} style={styles.home} />
                    <Text style={styles.fontStyle}>{item.name}</Text>
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
    home: {
        width: '100%',
        height: 90,
        resizeMode: 'stretch',
    },
    fontStyle: {
        position: 'absolute',
        left: 75,
        top: 33,
        fontWeight: "bold",
        color: "white",
        fontSize: 20
    },
});