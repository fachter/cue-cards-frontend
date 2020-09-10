import React from 'react'
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Icon from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';






export default class AddImage extends React.Component {
    
    state = {
        image: null,
    };
    
    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    render() {

        

        

        

        
    
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.showAddImage}
                onRequestClose={() => this.props.close()}>
                <View style={styles.background}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.close()}>
                        <AntDesign name="closecircleo" size={24} color="grey" />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>Profilbild hochladen</Text>
                    <View style={styles.window}>
                        <TouchableOpacity style={styles.windowButtons} >
                            <Icon.AntDesign name="camera" size={35} color='#008FD3' />
                            <Text style={styles.buttonText}>Kamera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.windowButtons]}  onPress={()=> this._pickImage()} >
                            <Icon.AntDesign name="picture" size={35} color='#008FD3' />
                            <Text style={styles.buttonText}>Galerie</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
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
        height: '30%',
        alignItems: 'center',

    },
    cancelButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignSelf: 'flex-end',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 20,
    },
    friendName: {
        width: '85%',
        borderRadius: 5,
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
        backgroundColor: '#202225',
        padding: 10,
        margin: 5,

    },
    buttonContainer: {
        flexDirection: 'row'
    },
    addButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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
    switchView: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center',
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 50
    },
    switchText: {
        color: 'white',
        marginTop: 5,
        fontSize: 20
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.9
    },
    window: {
        width: '80%',
        height: '15%',
        flexDirection: 'row',
        borderRadius: 5
    },
    windowButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 23,
    },
    buttonText: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10,
        color: 'white'
    }
});
