
import React, { useEffect, useState } from 'react';



import { InternetConnectionProvider } from './API/InternetConnection'

import { AsyncStorage, AppState } from 'react-native'

import axios from 'axios'


import Sidebar from './navigation/Sidebar'
import LoginScreen from './screens/LoginRegistrationScreen/LoginScreen'


export default function App({ navigation }) {

  useEffect(() => {

    _retrieveToken().then(token => {
      _getUserData(token)
    })
  })




  function _getUserData(token) {
    axios.get("http://167.172.170.147:8088/get-users-data", {
      headers: {
        'Authorization': "Bearer " + token
      }
    }).then(resp => {
      console.log(resp.data)
      alert(true)
    })
      .catch((err) => {
        console.log(err)
        //navigiere zum LoginScreen 
      })
  }


  async function _retrieveToken() {
    try {
      const token = await AsyncStorage.getItem('userToken')
      if (token != null) {
        return token
      }
    } catch (error) {
      console.log("Error by retrieve token:" + error)

    }
  }


  return (
    <InternetConnectionProvider>
      <Sidebar />
    </InternetConnectionProvider>
  )

}







