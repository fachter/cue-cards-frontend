import React from 'react'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';




import { ListStructureProvider } from '../screens/HomeScreen/ListStructureProvider'
import { UserContext } from '../screens/LoginRegistrationScreen/UserProvider';

import HomeScreen from '../screens/HomeScreen/HomeScreen'
import CardScreen from '../screens/CardScreen/CardScreen'
import MultipleChoice from '../screens/CardCreatorScreen/MultipleChoice';
import SingleChoice from '../screens/CardCreatorScreen/SingleChoice';
import Freetext from '../screens/CardCreatorScreen/Freetext';



import FriendsScreen from '../screens/FriendsScreen/FriendsScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen/StatisticsScreen';
import SendCardsScreen from '../screens/SendCardsScreen/SendCardsScreen';
import LoginScreen from '../screens/LoginRegistrationScreen/LoginScreen'
import RegistrationScreen from '../screens/LoginRegistrationScreen/RegistrationScreen'
import RoomScreen from '../screens/RoomScreen/RoomScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import ContainRoomScreen from '../screens/RoomScreen/ContainRoomScreen';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const StatisticsStack = createStackNavigator();
const SendCardsStack = createStackNavigator();
const LoginRegistrationStack = createStackNavigator();
const RoomStack = createStackNavigator();




const headerOptions = ({ route, navigation }) => ({
    headerTitle: getHeaderTitle(route),
    headerRight: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#202225" onPress={() => { navigation.openDrawer() }} />
    ),
    headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" onPress={() => navigation.goBack()} />
    )
})

const headerOptionsFirstPage = ({ route, navigation }) => ({
    headerTitle: getHeaderTitle(route),
    headerRight: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#202225" onPress={() => { navigation.openDrawer() }} />
    ),

})


function getHeaderTitle(route) {
    switch (route.name) {
        case undefined:
            return ''
        case 'Rooms':
            return 'Räumeübersicht'
        case 'MyRoom':
            return 'Mein Raum'
        case 'CardScreen':
            return "welche Überschrift hier?"
    }
}

function RoomStackScreen({ navigation, route }) {



    return (
        <RoomStack.Navigator initialRouteName="Rooms" screenOptions={{
            headerStyle: {
                backgroundColor: "#202225"

            },
            headerTintColor: "white"
        }}>
            <RoomStack.Screen name="Rooms" component={RoomScreen} options={headerOptionsFirstPage} />
            <RoomStack.Screen name="MyRoom" component={HomeScreen} options={headerOptions} />
            <RoomStack.Screen name="ContainRoom" component={ContainRoomScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" onPress={() => navigation.pop()} />)
            }} />
            <HomeStack.Screen name="MultipleChoice" component={MultipleChoice} options={headerOptions}></HomeStack.Screen>
            <HomeStack.Screen name="SingleChoice" component={SingleChoice} options={headerOptions}></HomeStack.Screen>
            <HomeStack.Screen name="Freetext" component={Freetext} options={headerOptions}></HomeStack.Screen>
            <HomeStack.Screen name="CardScreen" component={CardScreen} options={headerOptions}></HomeStack.Screen>
        </RoomStack.Navigator>
    );
}


const FriendsStackScreen = ({ navigation }) => (
    <FriendsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#202225"

        },
        headerTintColor: "white"
    }}>
        <FriendsStack.Screen name="Freunde" component={FriendsScreen} options={headerOptionsFirstPage} />
    </FriendsStack.Navigator>
);


const SettingsStackScreen = ({ navigation }) => (

    <SettingsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#202225"

        },
        headerTintColor: "white"
    }}>
        <SettingsStack.Screen name="Einstellungen" component={SettingsScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#202225" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" />
            )
        }} />
    </SettingsStack.Navigator>
);

const StatisticsStackScreen = ({ navigation }) => (
    <StatisticsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#202225"

        },
        headerTintColor: "white"
    }}>
        <StatisticsStack.Screen name="Statistiken" component={StatisticsScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#202225" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" />
            )
        }} />
    </StatisticsStack.Navigator>
);

const SendCardsStackScreen = ({ navigation }) => (
    <SendCardsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#202225"

        },
        headerTintColor: "white"
    }}>
        <SendCardsStack.Screen name="Karten senden" component={SendCardsScreen} options={{
            headerRight: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#202225" onPress={() => { navigation.openDrawer() }} />
            ),
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" />

            )

        }} />
    </SendCardsStack.Navigator>
);

export const LoginRegistrationStackScreen = ({ navigation }) => (
    <LoginRegistrationStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#202225"
        },
        headerTintColor: "#202225"
    }}>
        <LoginRegistrationStack.Screen name="Login" component={LoginScreen} />
        <LoginRegistrationStack.Screen name="Registration" component={RegistrationScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#202225" onPress={() => navigation.goBack()} />)
        }} />
    </LoginRegistrationStack.Navigator>
);











export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Drawer.Navigator drawerContentOptions={{
                style: {
                    backgroundColor: '#202225',
                },
                labelStyle: {
                    color: 'white'
                }
            }}>
                <Drawer.Screen name="RoomStack" component={RoomStackScreen}
                    options={{
                        drawerIcon: () => (
                            <Icon name="ios-people" color="white" size={25} />
                        )
                    }}
                />
                <Drawer.Screen name="Freunde" component={FriendsStackScreen}
                    options={{
                        drawerIcon: () => (
                            <Icon name="md-person" color="white" size={25} />
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
                <Drawer.Screen name="Statistiken" component={StatisticsStackScreen}
                    options={{
                        drawerIcon: () => (
                            <Icon name="ios-stats" color="white" size={25} />
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
            </Drawer.Navigator>

        )
    }
}