
import React, { useEffect, useState, useCallback, useContext } from 'react';



import { InternetConnectionProvider, InternetConnectionContext } from './API/InternetConnection'
import { UserProvider, UserContext } from './screens/LoginRegistrationScreen/UserProvider'
import { SettingsProvider } from './screens/SettingsScreen/SettingsProvider'
import { ListStructureProvider } from './screens/HomeScreen/ListStructureProvider'
import { RoomListStructureProvider } from './screens/RoomScreen/RoomListStructureProvider'
import { CopyPasteProvider } from './screens/HomeScreen/CopyPasteProvider'
import storeDataOnDB from './API/Database'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AsyncStorage, AppState } from 'react-native'
import axios from 'axios'
import Sidebar from './navigation/Sidebar'
import { LoginRegistrationStackScreen } from './navigation/Sidebar';
import { RoomListStructureContext } from './screens/RoomScreen/RoomListStructureProvider';


const StartStack = createStackNavigator()

const StartScreen = () => {
  const { isLoggedin } = useContext(UserContext)

  return (
    <NavigationContainer >
      <StartStack.Navigator screenOptions={{
        headerShown: false,
      }}>
        {isLoggedin ? <StartStack.Screen name="Sidebar" component={Sidebar}></StartStack.Screen>
          :
          <StartStack.Screen name="LoginScreen" component={LoginRegistrationStackScreen}></StartStack.Screen>}
      </StartStack.Navigator>
    </NavigationContainer>
  )
}


export default class App extends React.Component {
  constructor(props) {
    super(props)
    AppState.addEventListener('change', this._handleAppStateChange);
  }


  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState)
    if (nextAppState === 'background') {
      // Database.storeDataOnDB()
    }
  }

  render() {

    return (
      <RoomListStructureProvider>
      <CopyPasteProvider>
        <ListStructureProvider>
          <SettingsProvider>
            <UserProvider>
              <InternetConnectionProvider>
                <StartScreen />
              </InternetConnectionProvider>
            </UserProvider >
          </SettingsProvider>
        </ListStructureProvider>
      </CopyPasteProvider>
      </RoomListStructureProvider>
    )
  }
}








