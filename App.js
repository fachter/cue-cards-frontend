
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import UserProvider from './screens/LoginRegistrationScreen/UserProvider'
import { UserContext } from './screens/LoginRegistrationScreen/UserProvider'
import { SettingsProvider } from './screens/SettingsScreen/SettingsProvider'
import { ListStructureProvider } from './screens/HomeScreen/ListStructureProvider'
import { CopyPasteProvider } from './screens/HomeScreen/CopyPasteProvider'
import { ProfileProvider } from './screens/ProfileScreen/ProfileProvider'

import Sidebar from './navigation/Sidebar'
import { LoginRegistrationStackScreen } from './navigation/Sidebar';


import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Require cycle', '[SECURITY] node-uuid'
])





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




class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <ProfileProvider>
        <UserProvider>
          <CopyPasteProvider>
            <ListStructureProvider>
              <SettingsProvider>
                <StartScreen />
              </SettingsProvider>
            </ListStructureProvider>
          </CopyPasteProvider>
        </UserProvider >
      </ProfileProvider>
    )
  }
}



export default (App)

