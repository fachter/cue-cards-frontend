import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Modal,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ProfileContext } from './ProfileProvider'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'


import { syncAxiosPost } from '../../API/Database'
import AddImage from './AddImage';
import pickImage from './../../API/ImagePicker';

import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {



    //const [showAddImage, setShowAddImage] = useState(null);

    const {
        setImage,
        image,
        setProfileImage,
        showAddImage,
        setShowAddImage
    } = useContext(ProfileContext)

    const { username, userToken, setUserImage } = useContext(UserContext)
    const navigation = useNavigation()


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
                        setUserImage(cloudData.url)
                        syncAxiosPost('link', 'EditProfilScreen', 'data', userToken)
                            .catch(err => {
                                console.log('Fehler beim Imageupload. Probleme mit der Datenbank ' + err)
                            })

                    }).catch(err => {
                        console.log('Fehler beim Imageupload. Probleme mit der Cloud ' + err)
                    })
            })
        })
    }

    function _saveButtonClicked() {
        setProfileImage(image);
        navigation.navigate('Profil')
    }


    return (

        <View style={styles.container}>
            {image != null ? <ImageBackground
                source={{ uri: image }}
                style={styles.profilbild}
                imageStyle={{ borderRadius: 80 }}
            >
                <TouchableOpacity
                    style={styles.bildBearbeitenKnopf}
                    onPress={() => setShowAddImage(true)}>
                    <Icon
                        name="camera"
                        size={27}
                        color="white"
                    />
                </TouchableOpacity>
            </ImageBackground>
                :
                <ImageBackground
                    source={require('../../assets/Passbild.jpg')}
                    style={styles.profilbild}
                    imageStyle={{ borderRadius: 80 }}
                >
                    <TouchableOpacity
                        style={styles.bildBearbeitenKnopf}
                        //onPress={() => updateImage()}>
                        onPress={() => setShowAddImage(true)}>
                        <Icon
                            name="camera"
                            size={27}
                            color="white"
                        />
                    </TouchableOpacity>
                </ImageBackground>
            }
            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color="lightgrey"
                    size={21}
                    style={styles.feldIcon}
                />
                <Text style={styles.feldbezeichner}>Name</Text>
                <TextInput
                    placeholder="Mathias Meyer"
                    placeholderTextColor="white"
                    autoCorrect={false}
                    style={styles.textInput}
                />
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
                    placeholder="Matze.stinkt@DariusIstAwsome.de"
                    placeholderTextColor="white"
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={styles.textInput}
                />
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
                <TouchableOpacity style={styles.bearbeitenKnopf}>
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

            <TouchableOpacity style={styles.saveButton} onPress={() => _saveButtonClicked()} >
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

    // panel: {
    //     padding: 20,
    //     backgroundColor: '#FFFFFF',
    //     paddingTop: 20,
    //     // borderTopLeftRadius: 20,
    //     // borderTopRightRadius: 20,
    //     // shadowColor: '#000000',
    //     // shadowOffset: {width: 0, height: 0},
    //     // shadowRadius: 5,
    //     // shadowOpacity: 0.4,
    // },
    // header: {
    //     backgroundColor: '#FFFFFF',
    //     shadowColor: '#333333',
    //     shadowOffset: { width: -1, height: -3 },
    //     shadowRadius: 2,
    //     shadowOpacity: 0.4,
    //     // elevation: 5,
    //     paddingTop: 20,
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    // },
    // panelHeader: {
    //     alignItems: 'center',
    // },
    // panelHandle: {
    //     width: 40,
    //     height: 8,
    //     borderRadius: 4,
    //     backgroundColor: '#00000040',
    //     marginBottom: 10,
    // },
    // panelTitle: {
    //     fontSize: 27,
    //     height: 35,
    // },
    // panelSubtitle: {
    //     fontSize: 14,
    //     color: 'gray',
    //     height: 30,
    //     marginBottom: 10,
    // },
    // panelButton: {
    //     padding: 13,
    //     borderRadius: 10,
    //     backgroundColor: '#FF6347',
    //     alignItems: 'center',
    //     marginVertical: 7,
    // },
    // panelButtonTitle: {
    //     fontSize: 17,
    //     fontWeight: 'bold',
    //     color: 'white',
    // },
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