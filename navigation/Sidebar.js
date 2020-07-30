import React from 'react'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { ListStructureProvider } from '../screens/HomeScreen/ListStructureProvider'
import { UserContext } from '../screens/LoginRegistrationScreen/UserProvider';

import HomeScreen from '../screens/HomeScreen/HomeScreen'
import CardCreatorScreen from '../screens/CardCreatorScreen/CardCreatorScreen'
import CardScreen from '../screens/CardScreen/CardScreen'

import FriendsScreen from '../screens/FriendsScreen/FriendsScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen/StatisticsScreen';
import SendCardsScreen from '../screens/SendCardsScreen/SendCardsScreen';
import LoginScreen from '../screens/LoginRegistrationScreen/LoginScreen'
import RegistrationScreen from '../screens/LoginRegistrationScreen/RegistrationScreen'
import RoomScreen from '../screens/RoomScreen/RoomScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

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
            headerTitle: false,
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
        <FriendsStack.Screen name="Freunde" component={FriendsScreen} options={headerOptionsFirstPage} />
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

export const LoginRegistrationStackScreen = ({ navigation }) => (
    <LoginRegistrationStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black"

        },
        headerTintColor: "black"
    }}>
        <LoginRegistrationStack.Screen name="Login" component={LoginScreen} />
        <LoginRegistrationStack.Screen name="Registration" component={RegistrationScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="black" onPress={() => navigation.goBack()} />)
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
        <RoomStack.Screen name="Räume" component={RoomScreen} options={headerOptionsFirstPage} />
    </RoomStack.Navigator>
);





export default class Sidebar extends React.Component {


    constructor(props) {
        super(props)

    }

    render() {
        return (
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
                <Drawer.Screen name="Räume" component={RoomStackScreen}
                    options={{
                        drawerIcon: () => (
                            <Icon name="ios-people" color="white" size={25} />
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
                <Drawer.Screen name="Logout" component={LoginRegistrationStackScreen}
                    options={{
                        drawerIcon: () => (
                            <AntDesign name="logout" size={25} color="white" />
                        )
                    }}
                />
            </Drawer.Navigator>

        )
    }
}