import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ProfileContext } from './ProfileProvider'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'


import { asyncAxiosPost } from '../../API/Database'
import AddImage from './AddImage';
import pickImage from './../../API/ImagePicker';

import { useNavigation, useTheme } from '@react-navigation/native';
import ChangePassword from './ChangePassword';

export default function EditProfileScreen() {



    const [showAddImage, setShowAddImage] = useState(null);

    // const {
    //     setImage,
    //     image,
    //     setProfileImage,
    //     showAddImage,
    //     setShowAddImage,
    //     showChangePassword,
    //     setShowChangePassword
    // } = useContext(ProfileContext)

    const { username, setUserName, userToken, setUserImage, userImage, nickName, setNickName, email, setEmail, password } = useContext(UserContext)
    const [showChangePasswordView, setShowChangePaswordView] = useState(false)

    const [nicknameStorage, setNicknameStorage] = useState(nickName)
    const [passwordStorage, setPasswordStorage] = useState(password)
    const [userImageStorage, setUserImageStorage] = useState(userImage)
    const [emailStorage, setEmailStorage] = useState(email)

    function _closeAddImage() {
        setShowAddImage(false);
    }



    const updateImage = async () => {
        pickImage().then(async (img) => {

            const uri = img.uri
            const type = 'image/jpeg'
            const name = username
            const source = { uri, type, name }

            const data = new FormData()
            data.append('file', source)
            data.append('upload_preset', 'CueCards')
            data.append('cloud_name', 'dilnshj2a')

            fetch('https://api.cloudinary.com/v1_1/dilnshj2a/image/upload', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                res.json()
                    .then(cloudData => {
                        setUserImageStorage(cloudData.url)

                    })
            }).catch(err => {
                console.log('Fehler beim Imageupload. Probleme mit der Cloud ' + err)
            })
        })
    }



    const updateProfilDataLocal = () => {
        setNickName(nicknameStorage)
        setEmail(emailStorage)
        setUserImage(userImageStorage)
        setPasswordStorage(passwordStorage)

    }


    const sendNewProfileDataToDB = () => {

        let newProfileData = {
            nickName: nicknameStorage,
            userImage: userImageStorage,
            email: emailStorage,
            password: passwordStorage
        }


        console.log(newProfileData)

        asyncAxiosPost(`https://cue-cards-app.herokuapp.com/api/user/change-profile-data`, 'EditProfilScreen', newProfileData, userToken)
            .then(res => {
                console.log(res)
                console.log('Profildaten wurden erfolgreich geändert')
                updateProfilDataLocal()

            }).catch(err => {
                console.log('Fehler beim speichern der Profildaten  in der DB ' + err)
            })

    }






    return (

        <View style={styles.container}>
            <ImageBackground
                source={{ uri: userImageStorage }}
                style={styles.profilbild}
                imageStyle={{ borderRadius: 80 }}
            >
                <TouchableOpacity
                    style={styles.bildBearbeitenKnopf}
                    onPress={() => updateImage()}>
                    <Icon
                        name="camera"
                        size={27}
                        color="white"
                    />
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color="lightgrey"
                    size={21}
                    style={styles.feldIcon}
                />
                <Text style={styles.feldbezeichner}>Nickname</Text>
                <TextInput
                    placeholder='Gebe deinen Nickname ein'
                    placeholderTextColor="white"
                    autoCorrect={false}
                    style={styles.textInput}
                    onChangeText={text => setNicknameStorage(text)}
                >{nickName}</TextInput>
            </View>
            <View style={styles.action}>
                <FontAwesome
                    name="envelope-o"
                    color="lightgrey"
                    size={21}
                    style={styles.feldIcon}
                />
                <Text style={styles.feldbezeichner}>Email</Text>
                <TextInput
                    placeholder='you@example.de'
                    placeholderTextColor="white"
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={styles.textInput}
                    onChangeText={text => setEmailStorage(text)}
                >{email}</TextInput>
            </View>

            <View style={styles.action}>
                <Icon
                    name="lock-outline"
                    color="lightgrey"
                    size={23}
                    style={styles.feldIcon}
                />
                <Text style={styles.feldbezeichner}>Passwort</Text>
                <Text style={[styles.textInput, { marginTop: 9 }]}>°°°°°°°°°°°°°°</Text>
                <TouchableOpacity style={styles.bearbeitenKnopf} onPress={() => setShowChangePaswordView(true)}>
                    <Icon
                        name="pencil"
                        color="#008FD3"
                        size={23}
                    />
                </TouchableOpacity>

            </View>

            <AddImage
                showAddImage={showAddImage}
                close={_closeAddImage}
            />
            <ChangePassword
                showChangePasswordView={showChangePasswordView}
                onSetVisibility={setShowChangePaswordView}
                onSetPasswordStorage={setPasswordStorage}
            />
            <TouchableOpacity style={styles.saveButton} onPress={() => sendNewProfileDataToDB()} >
                <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern</Text>
            </TouchableOpacity>
        </View >

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
    },
    profilbild: {
        alignSelf: 'center',
        width: 160,
        height: 160,
        marginTop: 30,
        marginBottom: 10
    },
    fontStyle: {
        position: 'absolute',
        left: 75,
        top: 33,
        fontWeight: "bold",
        color: "#008FD3",
        fontSize: 20
    },
    bildBearbeitenKnopf: {
        alignItems: 'center',
        alignSelf: 'center',
        padding: 9,
        borderRadius: 30,
        backgroundColor: '#008FD3',
        position: 'absolute',
        right: 2,
        bottom: 2
    },
    action: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        paddingBottom: 15,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    feldIcon: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    feldbezeichner: {
        paddingLeft: 50,
        color: 'grey'
    },
    textInput: {
        //flex: 1,
        //marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 50,
        color: 'white',
        fontSize: 18,
    },
    bearbeitenKnopf: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    saveButton: {
        backgroundColor: '#008FD3',
        height: 40,
        width: 130,
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 7
    },

});