import React from 'react'


import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';




import HomeScreen from '../screens/HomeScreen/HomeScreen'
import CardScreen from '../screens/CardScreen/CardScreen'
import MultipleChoice from '../screens/CardCreatorScreen/MultipleChoice';
import SingleChoice from '../screens/CardCreatorScreen/SingleChoice';
import Freetext from '../screens/CardCreatorScreen/Freetext';



import FriendsScreen from '../screens/FriendsScreen/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import LoginScreen from '../screens/LoginRegistrationScreen/LoginScreen'
import RegistrationScreen from '../screens/LoginRegistrationScreen/RegistrationScreen'
import RoomScreen from '../screens/RoomScreen/RoomScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
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
            return 'House of CueCards'
        case 'Room':
            return 'Mein Raum'
        case 'CardScreen':
            return "Befragung"
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
            <RoomStack.Screen name="Room" component={HomeScreen} options={headerOptions} />
            <HomeStack.Screen name="MultipleChoice" component={MultipleChoice} options={headerOptions}></HomeStack.Screen>
            <HomeStack.Screen name="SingleChoice" component={SingleChoice} options={headerOptions}></HomeStack.Screen>
            <HomeStack.Screen name="Freetext" component={Freetext} options={headerOptions}></HomeStack.Screen>
            <HomeStack.Screen name="CardScreen" component={CardScreen} options={headerOptions}></HomeStack.Screen>
        </RoomStack.Navigator>
    );
}

const ProfileStackScreen = ({ navigation }) => (
    <FriendsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#202225"

        },
        headerTintColor: "white"
    }}>
        <FriendsStack.Screen name="Profil" component={ProfileScreen} options={headerOptionsFirstPage}
            options={{
                headerLeft: () => (
                    <MaterialCommunityIcons.Button name="account-edit" size={25} backgroundColor="#202225" onPress={() => navigation.navigate('Profil bearbeiten')} />),
                headerRight: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#202225" onPress={() => { navigation.openDrawer() }} />
                )
            }} />
        <FriendsStack.Screen name="Profil bearbeiten" component={EditProfileScreen} options={headerOptions} />
    </FriendsStack.Navigator>
);


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




export const LoginRegistrationStackScreen = ({ navigation }) => (
    <LoginRegistrationStack.Navigator screenOptions={{
        headerShown: false,
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
                        title: "House of CueCards",
                        drawerIcon: () => (
                            <Icon name="ios-home" color="white" size={25} />
                        )
                    }}
                />
                <Drawer.Screen name="ProfileStack" component={ProfileStackScreen}
                    options={{
                        title: "Profil",
                        drawerIcon: () => (
                            <Icon name="md-person" color="white" size={25} />
                        )
                    }}
                />
                <Drawer.Screen name="FriendsStack" component={FriendsStackScreen}
                    options={{
                        title: "Freunde",
                        drawerIcon: () => (
                            <Icon name="ios-people" color="white" size={25} />
                        )
                    }}
                />
                <Drawer.Screen name="SettingsStack" component={SettingsStackScreen}
                    options={{
                        title: "Einstellungen",
                        drawerIcon: () => (
                            <Icon name="ios-settings" color="white" size={25} />
                        )
                    }}
                />
            </Drawer.Navigator>

        )
    }
}