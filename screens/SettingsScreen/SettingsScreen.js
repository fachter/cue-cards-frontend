
import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet, TextInput, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { SettingsContext } from './SettingsProvider';
import { UserContext } from '../LoginRegistrationScreen/UserProvider';
import logo from '../../assets/Logo.png';

function SettingsScreen() {

    const { saveUserOnDevice } = useContext(UserContext)
    const { maxCardLevel, setMaxCardLevel, maxCardLevelIncluded, setMaxCardLevelIncluded, shuffleCards, setShuffleCards } = useContext(SettingsContext)
    const { logout } = useContext(UserContext)


    function userLogout() {
        saveUserOnDevice(false, null, null)
        logout()
    }


    const toggleMaxLevelIncluded = (value) => {
        setMaxCardLevelIncluded(value)
    }

    const toggleShuffleCards = (value) => {
        setShuffleCards(value)
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
                <Text style={styles.text}>Alle Karten (inkl. höchster Stufe) abfragen? </Text>

                <Switch
                    style={styles.toggle}
                    trackColor={{
                        false: "grey", true: "#008FD3"
                    }}
                    thumbColor='#008FD3'
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => toggleMaxLevelIncluded(value)}
                    value={maxCardLevelIncluded}
                />
            </View>
            <View style={styles.settingView}>
                <MaterialCommunityIcons name="shuffle" size={25} color="grey" style={styles.icons} />
                <Text style={styles.text}>Karten beim Abfragen mischen?</Text>
                <Switch
                    style={styles.toggle}
                    trackColor={{
                        false: "grey", true: "#008FD3"
                    }}
                    thumbColor='#008FD3'
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => toggleShuffleCards(value)}
                    value={shuffleCards}
                />
            </View>
            <View style={styles.logoutView}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => userLogout()}>
                    <AntDesign name="logout" size={27} color="#008FD3" />
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
        width: '70%',
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
    toggle: {
        position: 'absolute',
        right: 20,
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