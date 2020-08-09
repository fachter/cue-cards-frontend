import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';



export default class FriendListItem extends React.Component {


    _OnlineOffline() {
        if (this.props.item.isOnline === true) {
            return '#3CB371'
        }
        return 'gray'
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <View style={[styles.onlineState, { backgroundColor: this._OnlineOffline() }]}>
                        <View style={styles.onlineStateInnerRing}></View>
                    </View>
                    <Text style={styles.listText}>{this.props.item.username}</Text>
                    <View style={styles.buttonContainer}>
                        <Icon.Button
                            style={styles.normalButton}
                            name="ios-share"
                            size={30}
                            color="white"
                            backgroundColor="#2f3136"
                        // </Icon.Button>onPress={() => onDelete(item.ID)}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        //paddingLeft: 10,
        //paddingRight: 10,
        paddingBottom: 10,
        height: 80,
        backgroundColor: '#2f3136'


    },
    innerView: {
        flex: 1,
        backgroundColor: '#2f3136',
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        paddingLeft: 20,
        fontSize: 30
    },
    onlineState: {
        height: 20,
        width: 20,
        borderRadius: 10,
        alignSelf: 'center',
        marginRight: 20,
        alignItems: 'center',
    },
    onlineStateInnerRing: {
        height: 13,
        width: 13,
        borderRadius: 10,
        backgroundColor: "#2f3136",
        marginTop: 3.5
    },
    listText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white"
    },
    normalButton: {
        //height: 50,
        //width: 50,
        //color: "white",
    },
    buttonContainer: {
        position: "absolute",
        right: 20
    }
});