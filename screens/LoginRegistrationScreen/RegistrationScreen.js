import React from 'react';
import { View, Image, TextInput, Dimensions, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
//import logo from '../assets/Logo.png';
import axios from 'axios';




const { width: WIDTH } = Dimensions.get('window')

export default class RegistrationScreen extends React.Component {

    state = {
        data: [],
        username: null,
        password: null,
        email: null,
        firstName: null,
        secondName: null,
        jwt: null,
    }

    componentDidMount() {
        this.getapiData()
    }

    async getapiData() {
        let resp = await axios.get('http://167.172.170.147:8088/testapicall')
        console.log(resp.data)
        this.setState({ data: resp.data })
    }

    dataIsValid() {
        return true
    }

    regNewAcc() {
        if (this.dataIsValid()) {

            axios.post('http://167.172.170.147:8088/authenticate', {
                username: 'username',
                password: 'password',
            })
                .then((resp) => {
                    this.setState({ jwt: resp.data.jwt })
                    //speichern im lokalcache
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    testApiCall() {

        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQaGlsaXAxIiwiZXhwIjoxNTkxMjAwOTk1LCJpYXQiOjE1OTAzMzY5OTV9.KKvdVNXx6ZPymSQfhn6fJFuVdhd9O3LYeacSEge1wtc'

        const AuthStr = 'Bearer '.concat(token);
        axios.get('http://167.172.170.147:8088/testApiCall')
            .then(response => {
                // If request is good...
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }



    render() {

        return (

            <ScrollView>
                <View style={styles.container}>
                    {/* <Image source={logo} style={styles.logo} /> */}

                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Benutzername'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={text => this.setState({ username: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Passwort'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Passwort wiederholen'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ passwordcheck: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'E-Mail'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ email: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Vorname'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ firstName: text })}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Nachname'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ secondName: text })}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={() => this.regNewAcc()}

                    >
                        <Text style={styles.text}>Registrieren</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>

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
        marginVertical: 15,
        paddingLeft: 10,
        color: 'white'

    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginHorizontal: 25,

        marginBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    }
})