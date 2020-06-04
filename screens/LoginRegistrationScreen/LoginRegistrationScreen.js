import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createMaterialBottomTabNavigator();

export default class LoginRegistrationScreen extends React.Component {

    render() {

        return (
            <Tab.Navigator
                barStyle={{ backgroundColor: 'black' }}
            >
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{

                        tabBarIcon: ({ color, size }) => (
                            <Icon name="ios-log-in" color={color} size={20} />
                        )
                    }}
                />
                <Tab.Screen name="Registrieren" component={RegistrationScreen}
                    options={{

                        tabBarIcon: ({ color, size }) => (
                            <Icon name="ios-person-add" color={color} size={20} />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }
}