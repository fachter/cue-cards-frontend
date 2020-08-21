
import React, { useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { SettingsContext } from './SettingsProvider';
import { UserContext } from '../LoginRegistrationScreen/UserProvider';
import logo from '../../assets/Logo.png';

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
                <FontAwesome name="level-up" size={25} color="grey" style={styles.icons, { marginLeft: 6 }} />
                <Text style={styles.text}>Maximales Kartenlevel:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={level => checkCardLevelValidity(level)}
                >{maxCardLevel}</TextInput>
            </View>
            <View style={styles.settingView}>
                <Entypo name="align-top" size={25} color="grey" style={styles.icons} />
                <Text style={styles.text}>Alle Karten (inkl. höchster Stufe){"\n"}abfragen? </Text>
                <CheckBox
                    value={maxCardLevelIncluded}
                    onValueChange={value => setMaxCardLevelIncluded(value)}
                    style={styles.checkbox}
                    tintColors={'white', 'blue'}
                />
            </View>
            <View style={styles.settingView}>
                <MaterialCommunityIcons name="shuffle" size={25} color="grey" style={styles.icons} />
                <Text style={styles.text}>Karten beim Abfragen mischen?</Text>
                <CheckBox
                    value={shuffleCards}
                    onValueChange={value => setShuffleCards(value)}
                    style={styles.checkbox}
                    tintColors={'white', 'blue'}
                />
            </View>
            <View style={styles.logoutView}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => userLogout()}>
                    <AntDesign name="logout" size={27} color="#008FD3" />
                    {/* <Text style={{ color: '#C7C7C7', marginTop: 1 }}>Logout</Text> */}
                </TouchableOpacity>
            </View>
            <Image source={logo} style={styles.logo} />
        </View>
    );
};
export default SettingsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f3136',
    },
    logoutButton: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    logoutView: {
        position: 'absolute',
        bottom: 20,
        right: 20,

    },
    text: {
        position: 'absolute',
        left: 40,
        fontSize: 20,
        color: '#C7C7C7',
        alignSelf: 'center'
    },
    textInput: {
        position: 'absolute',
        right: 34,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        marginLeft: 20,
        color: '#C7C7C7',
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 2
    },
    settingView: {
        marginLeft: 15,
        marginTop: 30,
        flexDirection: 'row',
    },
    checkbox: {
        position: 'absolute',
        right: 30,
        alignSelf: 'center'
    },
    logo: {
        position: 'absolute',
        width: 150,
        height: 60,
        bottom: 0,
        alignSelf: 'center'
    },
    icons: {
        alignSelf: 'center',
        marginRight: 10
    },
})