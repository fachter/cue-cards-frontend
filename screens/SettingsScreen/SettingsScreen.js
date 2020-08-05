import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { SettingsContext } from './SettingsProvider'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'

function SettingsScreen() {

    const { maxCardLevel, setMaxCardLevel } = useContext(SettingsContext)
    const { logout } = useContext(UserContext)

    function userLogout() {
        logout()

    }


    return (
        <View style={styles.container}>
            <View style={styles.maxCardLevel}>
                <Text style={styles.text}>Maximales Kartenlevel:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={level => setMaxCardLevel(level)}
                >{maxCardLevel}</TextInput>
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
    maxCardLevel: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row'
    }
})