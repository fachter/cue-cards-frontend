import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class NewCardWindow extends React.Component {


    render() {
        const { onNavigateToCardCreator, onSetVisibility } = this.props
        return (
            <Modal
                animationType="fade"
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
                            <Icon name="check-all" size={30} color='#008FD3' />
                            <Text style={styles.buttonText}>    Multiplechoice</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.windowButtons, { marginTop: 10 }]} onPress={() => onNavigateToCardCreator("SC")}>
                            <Icon name="check" size={30} color='#008FD3' />
                            <Text style={styles.buttonText}>    Singlechoice</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.windowButtons, { marginTop: 10 }]} onPress={() => onNavigateToCardCreator("FT")}>
                            <Icon name="card-text-outline" size={30} color='#008FD3' />
                            <Text style={styles.buttonText}>    Freitext</Text>
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
