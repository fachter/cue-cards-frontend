import React, { Component } from 'react';
import { TouchableOpacity, Button, StyleSheet, FlatList, View, Text, BackHandler } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import AddSetWindow from './AddSetWindow'
import RoomSetListItem from './RoomSetListItem';
import { Searchbar } from 'react-native-paper';
import Drawer from 'react-native-drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import { CopyPasteContext } from '../HomeScreen/CopyPasteProvider'



export default class ContainRoomScreen extends React.Component {

    static contextType = CopyPasteContext

    constructor(props) {
        super(props)

        this.state = {
            search: '',
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


    updateRoomList() {
        const copyPaste = this.context
        console.log(copyPaste.copyData)

        let copy = this.state.currentSetStructure
        copy.push(copyPaste.copyData)
        this.setState({ currentSetStructure: copy })
    }


    handleSetAdd(newListItem) {
        let copy = this.state.currentSetStructure
        copy.push({ id: copy.length, set: newListItem })
        this.setState({ currentSetStructure: copy })
        this.setState({ showAddSetWindow: false })
    }

    _showAddSetWindow() {
        if (this.state.showAddSetWindow === false) {
            this.setState({ showAddSetWindow: true })
        }
        else if (this.state.showAddSetWindow === true) {
            this.setState({ showAddSetWindow: false })
        }
    }

    renderDrawer() {
        //SlideMenu
        const { search } = this.state;

        return (
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

    openDrawer() {
        this.drawer.open()
    }

    closeDrawer() {
        this.drawer.close()
    }

    render() {

        const copyPaste = this.context

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref }}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.35}
                content={this.renderDrawer()}
                style={styles.drawer}
                side="right"
            >
                <View style={styles.container}>


                    {copyPaste.someThingIsCopied ? <View style={styles.copyPasteView}>
                        <Text>Einfügen</Text>
                        <Icon.Button
                            name="ios-copy"
                            size={23} color="black"
                            backgroundColor="white"
                            onPress={() => this.updateRoomList()}
                        />
                        <Icon.Button
                            style={{ alignSelf: 'flex-start' }}
                            name="ios-close"
                            size={23} color="black"
                            backgroundColor="white"
                            onPress={() => copyPaste.setSomeThingIsCopied(false)} />
                    </View> : null}


                    <FlatList
                        data={this.state.currentSetStructure}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
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
                        <Entypo name="plus" size={45} color="#008FD3" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.friendsButton} onPress={() => this.openDrawer()} >
                        <Entypo name="users" size={30} color="#008FD3" />
                    </TouchableOpacity>


                </View>
            </Drawer>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
        paddingTop: 30
    },
    plusButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'grey',
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: "#2f3136",
    },
    friendsButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'grey',
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: "#2f3136",
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
    },
    copyPasteView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }

})
