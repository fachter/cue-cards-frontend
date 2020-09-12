import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Modal
} from 'react-native';

import { useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { ProfileContext } from './ProfileProvider'


import ImagePicker from 'react-native-image-crop-picker';
import AddImage from './AddImage';



export default function EditProfileScreen() {



    //const [showAddImage, setShowAddImage] = useState(null);


    const {
        image,
        setImage,
        showAddImage,
        setShowAddImage
    } = useContext(ProfileContext)


    function _closeAddImage() {
        setShowAddImage(false);
    }

    return (
        <View style={styles.container}>
            <BottomSheet
                /*  ref={this.bs} */
                snapPoints={[330, 0]}


                //callbackNode={this.fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{
                margin: 20,
                //opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
            }}>
                <TouchableOpacity
                    style={{ alignItems: 'center', marginBottom: 35 }}
                    onPress={() => this.setState({ showAddImage: true })}>
                    <ImageBackground
                        source={require('../../assets/Passbild.jpg')}
                        style={{ height: 160, width: 160 }}
                        imageStyle={{ borderRadius: 80 }}
                    >
                        <View
                            style={styles.picture}>
                            <Icon
                                name="camera"
                                size={27}
                                color="white"
                            />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

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

                <TouchableOpacity style={styles.saveButton} >
                    <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",

    },
    fontStyle: {
        position: 'absolute',
        left: 75,
        top: 33,
        fontWeight: "bold",
        color: "#008FD3",
        fontSize: 20
    },
    picture: {
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
        // flexDirection: 'row',
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
        fontSize: 18
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
        marginTop: 40,
        marginHorizontal: 7
    },
});