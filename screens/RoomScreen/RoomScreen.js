import React from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity, SectionList} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AddRoomWindow from './AddRoomWindow';
import RoomListItem from './RoomListItem';
import DeleteRoomWindow from './DeleteRoomWindow';
import {SearchBar} from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';


export default class RoomScreen extends React.Component {

    constructor(props) {
        super(props)
    


 this.state= {
addRoomWindowVisibility: false,
deleteWindowVisible: false,
onDeleteItem: null,
search: '',
 rooms: [
     {
        id: 1,
        title: "Winf"
    },
    {
        id: 2,
        title: "Wirtschaftsinformatik"
    },
    {
        id: 3,
        title: "Clara und ich"
    } 
] 
} 
    }


     handleAdd(newListItem){
         let copy = this.state.rooms
         copy.push({id: copy.length, title: newListItem})
         this.setState({rooms: copy})
         }
    

    _showDeleteWindow(item){
        this.setState({onDeleteItem: item})
        this.setState({deleteWindowVisible: true})
    }

      _setRoomAddWindowVisibility() {
        if (this.state.addRoomWindowVisibility == true) {
            this.setState({addRoomWindowVisibility: false})
        } else {
            this.setState({addRoomWindowVisibility: true})
        }
    } 

    
render() {
        const {search} = this.state;
        return(
            <View style = {styles.container}>
                <Text>Gebe die 6-stellige Raum-ID ein, um einem Raum beizutreten</Text>
                <Searchbar
                placeholder="Raum beitreten"
                //onChangeText={_updateSearch()}
                value={search}
                />
                <FlatList
                data={this.state.rooms}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                <RoomListItem 
                item={item}
                onDeleteWindow={this._showDeleteWindow.bind(this)}
                />
                )}
                />
                
                <TouchableOpacity style={styles.plusButton} onPress={() => this.setState({addRoomWindowVisibility: true})} >
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
                <AddRoomWindow 
                    onSetVisibility={this._setRoomAddWindowVisibility.bind(this)} 
                    addRoomWindowVisibility={this.state.addRoomWindowVisibility}
                    //name={this.state.rooms.ti}
                    onAdd={this.handleAdd.bind(this)}
                 />
                 {this.state.deleteWindowVisible ?
                <DeleteRoomWindow
                    onDeleteWindow={() => this.props.setState({ deleteWindowVisible: true })}
                /> : null}
            </View>
            


        )
    
                }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
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
});