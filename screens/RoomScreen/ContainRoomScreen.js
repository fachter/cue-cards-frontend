import React, {Component} from 'react';
import {TouchableOpacity, Button, StyleSheet, FlatList, View, Text, BackHandler} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AddSetWindow from './AddSetWindow'
import RoomSetListItem from './RoomSetListItem';
import Drawer from 'react-native-drawer';


export default class ContainRoomScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state= {
            currentSetStructure: [
                {
                    id: '1',
                    set: 'Set'
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
        return(
            <View style={styles.menuContainer}>
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
                    <Button onPress={() => this.closeDrawer()}
                    title='Schließen'
                    ></Button>
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
                data={this.state.currentSetStructure}
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
                /> : null}
                
                
                <TouchableOpacity style={styles.plusButton} onPress={() => this.setState({ showAddSetWindow: true })} >
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.freundeButton} onPress={() => this.openDrawer()} >
                    <Entypo name="plus" size={50} color="black" />
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
    freundeButton: {
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
    }
    
})

