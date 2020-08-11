import React from 'react'
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default class FriendOptionsWindow extends React.Component {

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => onSetVisibility(false)}
            >
                <View style={styles.background}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => onSetVisibility(false)}>
                        <AntDesign name="closecircleo" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={styles.window}>
                        <Text style={styles.headingText}>Was möchtest du erstellen?</Text>
                        <TouchableOpacity style={[styles.windowButtons, { marginTop: 20 }]} onPress={() => onNavigateToCardCreator("MC")}>
                            <Text style={styles.buttonText}>    Multiplechoice</Text>
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
        opacity: 0.9
    },
    window: {
        width: '80%',
        height: '30%',
        alignItems: 'center',

    },

    windowButtons: {
        flexDirection: 'row',
        width: '50%',
        height: '20%',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    headingText: {
        color: 'white',
        margin: 10,
        marginBottom: 10,
        fontSize: 20,
    },
    buttonText: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'white',
    },
    cancelButton: {
        alignSelf: 'flex-end',
        margin: 5,
    },
});
