import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, BackHandler} from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default class ContainRoomScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state= {
            currentSetStructure: []
        }


        
    }
    

    render() {

        return(
            <View style = {styles.container}>
                <TouchableOpacity style={styles.plusButton} onPress={() => this.setState({ addRoomWindowVisibility: true })} >
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
                
                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#595959",
        paddingTop: 30
    },
    plusButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})