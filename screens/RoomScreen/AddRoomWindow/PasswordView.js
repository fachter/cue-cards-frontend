import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios'


import ActivityIndicatorView from './ActivityIndicatorView'



export default class PasswordView extends React.Component {

    state = {
        password: null,
    }



    askingServerForRightPassword() {
        this.setState({ showActivityIndicator: true })

        let postObject = {
            password: this.state.password,
            id: this.props.roomID

        }

        Axios.post(`https://cue-cards-app.herokuapp.com/api/join-room/authenticate`, postObject, {
            headers: {
                'Authorization': "Bearer " + this.props.userToken
            }
        }).then(res => {
            console.log(res)
            this.state.PasswordView = false
            this.state.JoinSucces = true
            this.setState({ showResultView: true })
            this.props.onSetVisibility(false)
            this.props.updateRooms()


        }).catch(err => {
            console.log(err)
            this.state.PasswordView = false
            this.state.JoinSucces = true
            this.setState({ showResultView: true })
        })
    }



    render() {
        return (

            <View style={styles.window}>
                {
                    this.props.onShowActicityIndicator ?
                        <ActivityIndicatorView onResult={this.props.onResult} />
                        :
                        <View style={styles.window}>
                            <Text
                                style={styles.headingText}>Password notwendig:</Text>
                            <TextInput
                                style={styles.friendName}
                                placeholderTextColor="grey"
                                placeholder='Passwort'
                                onChangeText={text => this.setState({ password: text })}>
                            </TextInput>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.saveButton} onPress={() => this.askingServerForRightPassword()}>
                                    <MaterialCommunityIcons name="plus-box-outline" size={23} color="white" />
                                    <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Beitreten</Text>
                                </TouchableOpacity>
                            </View >
                        </View>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    window: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 20,
    },
    friendName: {
        width: 300,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: '#2f3136',
        marginHorizontal: 25,
        marginVertical: 10,
        paddingLeft: 10,
        color: 'white'

    },
    saveButton: {
        borderColor: '#008FD3',
        borderWidth: 1,
        flexDirection: 'row',
        height: 45,
        width: 140,
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginHorizontal: 7
    },
    buttonContainer: {
        flexDirection: 'row'
    },
});