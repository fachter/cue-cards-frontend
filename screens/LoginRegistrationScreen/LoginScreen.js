import React from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, Button, FlatList, StyleSheet } from 'react-native';
import logo from '../../assets/Logo.png';
import { AsyncStorage } from 'react-native'
import axios from 'axios';




const { width: WIDTH } = Dimensions.get('window')

export default class LoginScreen extends React.Component {


    dataIsValid() {
        return true
    }



    _authenticateAcc() {
        if (this.dataIsValid()) {

            axios.post('http://167.172.170.147:8088/authenticate', {
                username: 'username',
                password: 'password',
            })
                .then((resp) => {
                    console.log(resp.data.jwt)
                    this._storeToken(resp.data.jwt)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }



    _storeToken = async (token) => {
        try {
            await AsyncStorage.setItem(
               ' userToken', token
            );
        } catch (error) {
            console.log("Error by storing token: " + error)
        }
    }





    render() {

        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={'Benutzername'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={'Passwort'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={() => this._authenticateAcc()}>
                    <Text text={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={() => this._retrieveData()}>
                    <Text text={styles.text}>Login</Text>
                </TouchableOpacity>



            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#111111',
        paddingTop: 25
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 50
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: 'black',
        marginHorizontal: 25,
        marginVertical: 25,
        paddingLeft: 10,
        color: 'white'

    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginHorizontal: 25

    },
    text: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    }
})