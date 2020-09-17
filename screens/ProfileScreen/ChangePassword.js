
import React, {useContext} from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
import { ProfileContext } from './ProfileProvider'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';


export default function ChangePassword() {

    const {
        showChangePassword,
        setShowChangePassword
    } = useContext(ProfileContext)

    /* function _comparePasswords() {
        return new Promise((resolve, reject) => {
            if (password1 === password2) {
                resolve()
            } else {
                reject('Passwörter stimmen nicht überein')
            }
        })
    }

    function _changePassword(){
        setShowChangePassword(false)
        _comparePasswords()
        .then(() => {
            axios.post('Link', {
                password: password1
            })
            .then((resp) => {
                console.log("Passwortänderung erfolgreich")
                setUserToken(resp.data.jwt)
                logout()
            })
        })
        } */
    

return(
<Modal
animationType="fade"
transparent={true}
visible={showChangePassword}
>
<View style={styles.background}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => _changePassword()}>
                <AntDesign name="closecircleo" size={24} color="grey" />
            </TouchableOpacity>
<View style={styles.window}>
    <Text
        style={styles.headingText}>Passwort ändern</Text>
    <TextInput
        style={styles.friendName}
        maxLength={20}
        placeholder="Passwort eingeben"
        placeholderTextColor="grey"
        //onChangeText={text => setPassword1(text)}
        >
    </TextInput>
    <TextInput
        style={styles.friendName}
        maxLength={20}
        placeholder="Passwort erneut eingeben"
        placeholderTextColor="grey"
        //onChangeText={text => setPassword2(text)}
        >
    </TextInput>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}  onPress={() => setShowChangePassword(false)} >
            <MaterialCommunityIcons name="home-plus" size={20} color="white" />
            <Text style={{ marginLeft: 10, fontStyle: 'italic', fontSize: 17, color: 'white' }}>Ändern</Text>
        </TouchableOpacity>
    </View >
</View>
</View>
</Modal>
);
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.85

    },
    window: {
        width: '100%',
        alignItems: 'center'

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
    cancelButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignSelf: 'flex-end',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'

    }
});