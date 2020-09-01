
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



import UserProvider from './screens/LoginRegistrationScreen/UserProvider'
import { UserContext } from './screens/LoginRegistrationScreen/UserProvider'
import { SettingsProvider } from './screens/SettingsScreen/SettingsProvider'
import { ListStructureProvider } from './screens/HomeScreen/ListStructureProvider'
import { RoomListStructureProvider } from './screens/RoomScreen/RoomListStructureProvider'
import { CopyPasteProvider } from './screens/HomeScreen/CopyPasteProvider'

import Sidebar from './navigation/Sidebar'
import { LoginRegistrationStackScreen } from './navigation/Sidebar';

// import { Provider } from 'react-redux'
// import { configureStore } from './API/redux/store/store'

// const store = configureStore



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
      <UserProvider>
        <CopyPasteProvider>
          <RoomListStructureProvider>
            <ListStructureProvider>
              <SettingsProvider>
                <StartScreen />
              </SettingsProvider>
            </ListStructureProvider>
          </RoomListStructureProvider>
        </CopyPasteProvider>
      </UserProvider >
    )
  }
}



export default (App)




