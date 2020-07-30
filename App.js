
import React, { useEffect, useState, useCallback, useContext } from 'react';



import { InternetConnectionProvider } from './API/InternetConnection'
import { UserProvider, UserContext } from './screens/LoginRegistrationScreen/UserProvider'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AsyncStorage, AppState } from 'react-native'
import axios from 'axios'
import Sidebar from './navigation/Sidebar'
import { LoginRegistrationStackScreen } from './navigation/Sidebar';


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

    this._retrieveToken().then(token => {
      this._getUserData(token)
    })
  }





  _getUserData(token) {
    axios.get("https://cue-cards-app.herokuapp.com/get-users-data", {
      headers: {
        'Authorization': "Bearer " + token
      }
    }).then(resp => {
      console.log(resp.data)
    })
      .catch((err) => {
        console.log(err)

      })
  }


  async _retrieveToken() {
    try {
      const token = await AsyncStorage.getItem('userToken')
      if (token != null) {
        return token

      }
    } catch (error) {
      console.log("Error by retrieve token:" + error)

    }
  }

  render() {
    return (
      <UserProvider>
        <InternetConnectionProvider>
          <StartScreen />
        </InternetConnectionProvider>
      </UserProvider >
    )
  }
}








