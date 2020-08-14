import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, CheckBox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { SettingsContext } from './SettingsProvider'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'

function SettingsScreen() {

    const { maxCardLevel, setMaxCardLevel, maxCardLevelIncluded, setMaxCardLevelIncluded, shuffleArray: shuffleCards, setShuffleCards } = useContext(SettingsContext)
    const { logout } = useContext(UserContext)


    function userLogout() {
        logout()
    }



    function checkCardLevelValidity(level) {
        if (level != "" && level < 10 && level > 0) {
            setMaxCardLevel(level)
        } else {
            setMaxCardLevel(6)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.settingView}>
                <Text style={styles.text}>Maximales Kartenlevel:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={level => checkCardLevelValidity(level)}
                >{maxCardLevel}</TextInput>
            </View>
            <View style={styles.settingView}>
                <Text style={styles.text}>Maximales Kartenlevel bei Session abfragen?</Text>
                <CheckBox
                    value={maxCardLevelIncluded}
                    onValueChange={value => setMaxCardLevelIncluded(value)}
                    style={styles.checkbox}
                />
            </View>
            <View style={styles.settingView}>
                <Text style={styles.text}>Karten beim Abfragen mischen?</Text>
                <CheckBox
                    value={shuffleCards}
                    onValueChange={value => setShuffleCards(value)}
                    style={styles.checkbox}
                />
            </View>
            <View style={styles.logoutView}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => userLogout()}>
                    <Text style={styles.text}>Logout</Text>
                    <AntDesign name="logout" size={22} color="white" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default SettingsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    logoutView: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 20,
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    settingView: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    checkbox: {
        position: 'absolute',
        right: 20,
    }
})