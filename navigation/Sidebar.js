import React, { useContext, useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { ListStructureProvider, ListStructureContext } from '../screens/HomeScreen/ListStructureProvider'

import HomeScreen from '../screens/HomeScreen/HomeScreen'
import CardCreatorScreen from '../screens/CardCreatorScreen/CardCreatorScreen'
import CardScreen from '../screens/CardScreen/CardScreen'

import FriendsScreen from '../screens/FriendsScreen/FriendsScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen/StatisticsScreen';
import SendCardsScreen from '../screens/SendCardsScreen/SendCardsScreen';
import LoginRegistrationScreen from '../screens/LoginRegistrationScreen/LoginRegistrationScreen';
import RoomScreen from '../screens/RoomScreen/RoomScreen';

import Icon from 'react-native-vector-icons/Ionicons';


const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const StatisticsStack = createStackNavigator();
const SendCardsStack = createStackNavigator();
const LoginRegistrationStack = createStackNavigator();
const RoomStack = createStackNavigator();


const headerOptions = ({ navigation }) => ({
    headerRight: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
    ),
    headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="black" onPress={() => navigation.goBack()} />
    )
})

const headerOptionsFirstPage = ({ navigation }) => ({
    headerRight: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
    ),

})



const HomeStackScreen = ({ navigation }) => (
    <ListStructureProvider>
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "black"
            },
            headerTintColor: "white"
        }}>
            <HomeStack.Screen name="ListOverView" component={HomeScreen} options={headerOptionsFirstPage}></HomeStack.Screen>
            <HomeStack.Screen name="CardCreator" component={CardCreatorScreen} options={headerOptions}></HomeStack.Screen>
            <HomeStack.Screen name="CardScreen" component={CardScreen} options={headerOptions}></HomeStack.Screen>
        </HomeStack.Navigator>
    </ListStructureProvider>


);



const FriendsStackScreen = ({ navigation }) => (
    <FriendsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black"

        },
        headerTintColor: "white"
    }}>
        <FriendsStack.Screen name="Freunde" component={FriendsScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
            ),

        }} />
    </FriendsStack.Navigator>
);


const SettingsStackScreen = ({ navigation }) => (
    <SettingsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black"

        },
        headerTintColor: "white"
    }}>
        <SettingsStack.Screen name="Einstellungen" component={SettingsScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="black" />
            )
        }} />
    </SettingsStack.Navigator>
);

const StatisticsStackScreen = ({ navigation }) => (
    <StatisticsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black"

        },
        headerTintColor: "white"
    }}>
        <StatisticsStack.Screen name="Statistiken" component={StatisticsScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="black" />
            )
        }} />
    </StatisticsStack.Navigator>
);

const SendCardsStackScreen = ({ navigation }) => (
    <SendCardsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black"

        },
        headerTintColor: "white"
    }}>
        <SendCardsStack.Screen name="Karten senden" component={SendCardsScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="black" />

            )

        }} />
    </SendCardsStack.Navigator>
);

const LoginRegistrationStackScreen = ({ navigation }) => (
    <LoginRegistrationStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black"

        },
        headerTintColor: "white"
    }}>
        <LoginRegistrationStack.Screen name="Login" component={LoginRegistrationScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="black" />

            )
        }} />
    </LoginRegistrationStack.Navigator>
);

const RoomStackScreen = ({ navigation }) => (
    <RoomStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black"

        },
        headerTintColor: "white"
    }}>
        <RoomStack.Screen name="Räume" component={RoomScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="black" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="black" />

            )
        }} />
    </RoomStack.Navigator>
);





export default class Sidebar extends React.Component {


    constructor(props) {
        super(props)

    }



    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContentOptions={{
                    style: {
                        backgroundColor: 'black'
                    },
                    labelStyle: {
                        color: 'white'
                    }
                }}>
                    <Drawer.Screen name="Home" component={HomeStackScreen}
                        options={{
                            drawerIcon: () => (
                                <Icon name="ios-home" color="white" size={25} />
                            )
                        }
                        }
                    />
                    <Drawer.Screen name="Freunde" component={FriendsStackScreen}
                        options={{
                            drawerIcon: () => (
                                <Icon name="md-person" color="white" size={25} />
                            )
                        }}
                    />
                    <Drawer.Screen name="Einstellungen" component={SettingsStackScreen}
                        options={{
                            drawerIcon: () => (
                                <Icon name="ios-settings" color="white" size={25} />
                            )
                        }}
                    />
                    <Drawer.Screen name="Statistiken" component={StatisticsStackScreen}
                        options={{
                            drawerIcon: () => (
                                <Icon name="ios-stats" color="white" size={25} />
                            )
                        }}
                    />
                    <Drawer.Screen name="Karten senden" component={SendCardsStackScreen}
                        options={{
                            drawerIcon: () => (
                                <Icon name="ios-share" color="white" size={25} />
                            )
                        }}
                    />
                    <Drawer.Screen name="Login " component={LoginRegistrationStackScreen}
                        options={{
                            drawerIcon: () => (
                                <Icon name="ios-share" color="white" size={25} />
                            )
                        }}
                    />
                    <Drawer.Screen name="Räume" component={RoomStackScreen}
                        options={{
                            drawerIcon: () => (
                                <Icon name="ios-people" color="white" size={25} />
                            )
                        }}
                    />

                </Drawer.Navigator>
            </NavigationContainer>

        )
    }
}