import React, { useContext, useEffect } from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, Button, FlatList, StyleSheet } from 'react-native';
import { UserContext } from './UserProvider'
import logo from '../../assets/Logo.png';

import axios from 'axios';




const { width: WIDTH } = Dimensions.get('window')

export default class LoginScreen extends React.Component {

    static contextType = UserContext

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.context.logout()
    }

    _authenticateAcc() {
        const user = this.context
        user.login()
        // axios.post('https://cue-cards-app.herokuapp.com/authenticate', {
        //     username: 'username',
        //     password: 'password',
        // })
        //     .then((res) => {
        //         user._storeToken(res.data.jwt)
        //         axios.get("https://cue-cards-app.herokuapp.com/get-users-data", {
        //             headers: {
        //                 'Authorization': "Bearer " + res.data.jwt
        //             }
        //         }).then(resp => {
        //             console.log(resp.data)
        //             //ListStrucutureprovider -> CurrentlistStrucutre aktualiseren
        //             user.login()
        //         })
        //             .catch((err) => {
        //                 console.log(err)
        //             })
        //     })
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
                <TouchableOpacity style={styles.button} onPress={() => this._authenticateAcc()}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Registration')}>
                    <Text style={styles.text}>Registrieren</Text>
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
    button: {
        width: 100,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,


    },
    text: {
        color: 'black',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    }
})