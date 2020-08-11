import React, {Component} from 'react';
import {TouchableOpacity, Button, StyleSheet, FlatList, View, Text, BackHandler} from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import AddSetWindow from './AddSetWindow'
import RoomSetListItem from './RoomSetListItem';
import { Searchbar } from 'react-native-paper';
import Drawer from 'react-native-drawer';


export default class ContainRoomScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state= {
            search: '',
            currentSetStructure: [
                
                {
                    subfolder: [
                        {
                            id: '1',
                            folder: 'folder2'
                        },
                        {
                            id: '2',
                            folder: 'folder3'
                        },
                        {
                            id: '3',
                            folder: 'folder4'
                        }
                    ]
                }
                
            ],
            showAddSetWindow: false,
            friends: [
                {
                    id: '1',
                    title: 'Philip'
                },
                {
                    id: '2',
                    title: 'Matze'
                },
                {
                    id: '3',
                    title: 'Darius'
                }
            ]
        }



        
    }

    handleSetAdd(newListItem) {
        let copy = this.state.currentSetStructure[0].subfolder
        copy.push({ id: copy.length, folder: newListItem })
        this.setState({ currentSetStructure: copy })
        this.setState({showAddSetWindow: false})
    }
    
    _showAddSetWindow(){
        if(this.state.showAddSetWindow === false){
        this.setState({showAddSetWindow: true})
        }
        else if(this.state.showAddSetWindow === true){
            this.setState({showAddSetWindow: false})
        }
    }

    renderDrawer(){
        //SlideMenu
        const { search } = this.state;

        return(
            <View style={styles.menuContainer}>
                <Text style={styles.textStyle}>Freund einladen</Text>
                <Searchbar
                    placeholder="Freund ID eingeben"
                    //onChangeText={_updateSearch()}
                    value={search}
                /> 
                <FlatList
                    style={{ flex: 1.0 }}
                    data={this.state.friends}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.menuTitleContainer}>
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
                    
            </View>
        )
    }

    openDrawer(){
        this.drawer.open()
    }

    closeDrawer(){
        this.drawer.close()
    }

    render() {
        
        return(
            <Drawer
                ref={(ref) => { this.drawer = ref }}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.35}
                content={this.renderDrawer()}
                style={styles.drawer}
                side="right"
            >
            <View style = {styles.container}>
                
                <FlatList
                data={this.state.currentSetStructure[0].subfolder}
                keyExtractor={item=> item.id}
                renderItem={({item}) =>
                 (
                    <RoomSetListItem
                    item={item}
                    />
                )}
                />
                {this.state.showAddSetWindow ?
                <AddSetWindow
                showAddSetWindow={this._showAddSetWindow}
                onAdd={this.handleSetAdd.bind(this)}

                /> : null}
                
                
                <TouchableOpacity style={styles.plusButton} onPress={() => this.setState({ showAddSetWindow: true })} >
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.friendsButton} onPress={() => this.openDrawer()} >
                    <Entypo name="users" size={50} color="black" />
                </TouchableOpacity> 
                
                    
            </View>
            </Drawer>

            
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
    },
    friendsButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    menuContainer: {
        flex: 1.0,
        backgroundColor: 'black',
    },
    
    menuTitle: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf: 'center',
    },
    textStyle: {
        color: 'white'
    }
    
})

