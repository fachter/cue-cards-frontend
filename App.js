
import React from 'react';

import { InternetConnectionProvider } from './API/InternetConnection'

import { AsyncStorage, AppState } from 'react-native'

import axios from 'axios'


import Sidebar from './navigation/Sidebar'


export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      jwt: null,

    }

    this._retrieveToken().then(() => {
      this._getUserData()
    })
  }





  _getUserData() {
    axios.get("http://167.172.170.147:8088/get-users-data", {
      headers: {
        'Authorization': "Bearer " + this.state.jwt
      }
    }).then(resp => {
      console.log('test')
      console.log(resp.data)
    })
      .catch((err) => {
        console.log(err)
      })
  }


  _retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken')
      if (token != null) {
        this.setState({ jwt: token })
      }
    } catch (error) {
      console.log("Error by retrieve token:" + error)
    }
  }




  render() {
    return (
      <InternetConnectionProvider>
        <Sidebar />
      </InternetConnectionProvider>

    )
  }
}







