import React from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity, SectionList, BackHandler} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AddRoomWindow from './AddRoomWindow';
import RoomListItem from './RoomListItem';
import DeleteRoomWindow from './DeleteRoomWindow';
import {SearchBar} from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import ContainRoomScreen from './ContainRoomScreen';


export default class RoomScreen extends React.Component {

    constructor(props) {
        super(props)
    

 this.state= {
containRoomScreenVisible: false,
roomsVisible: true,
addRoomWindowVisibility: false,
deleteWindowVisible: false,
onDeleteItem: null,
search: '',
 rooms: [],
 containRooms: [
        {
            ID: '1',
            Set: 'Superset'
        }
 ]
} 
    }




     handleAdd(newListItem){
         let copy = this.state.rooms
         copy.push({ID: copy.length, title: newListItem})
         this.setState({rooms: copy})
         }
    
     componentDidUpdate(){
             console.log(this.state.rooms)
            }

    

    _showDeleteWindow(item){
        this.setState({onDeleteItem: item})
        this.setState({deleteWindowVisible: true})
    }

    _showContainRoomScreen(){
        this.setState({containRoomScreenVisible: true})
        this.setState({roomsVisible: false})
    }

      _setRoomAddWindowVisibility() {
        if (this.state.addRoomWindowVisibility == true) {
            this.setState({addRoomWindowVisibility: false})
        } else {
            this.setState({addRoomWindowVisibility: true})
        }
    } 

    _deleteItemById(id)  {
        const copy = this.state.rooms
        var index

        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].ID === id)
                index = i
            
        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        this.setState({rooms: copy})
        this.setState({deleteWindowVisible: false}) 
        
    }

     _backButtonPressed(){
        this.setState({ containRoomScreenVisible: false })
        this.setState({ roomsVisible: true })
    } 

    
render() {
        const {search} = this.state;
        return(
            <View style = {styles.container}>
                
                {this.state.roomsVisible ?
                <Text>Gebe die 6-stellige Raum-ID ein, um einem Raum beizutreten

                </Text> : null}
                {this.state.roomsVisible ?
                <Searchbar
                placeholder="Raum beitreten"
                //onChangeText={_updateSearch()}
                value={search}
                /> : null}
                {this.state.roomsVisible ?
                <FlatList
                data={this.state.rooms}
                keyExtractor={item => item.ID}
                renderItem={({item}) => (
                <RoomListItem 
                item={item}
                onDeleteWindow={this._showDeleteWindow.bind(this)}
                showContainRoomScreen={this._showContainRoomScreen.bind(this)}
                />
                )}
                /> : null}
                
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
                    onDeleteWindow={() => this.setState({ deleteWindowVisible: false })}
                    onDelete={this._deleteItemById.bind(this)}
                    item={this.state.onDeleteItem}
                /> : null}
                {this.state.containRoomScreenVisible ?
                    <ContainRoomScreen
                        //showContainRoomScreen={() => this.setState({ containRoomScreenVisible: true })}
                        backButtonPressed = {this._backButtonPressed.bind(this)}
                    /> : null}
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