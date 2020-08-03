import React from 'react'
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default class NewCardWindow extends React.Component {



    render() {
        const { onNavigateToCardCreator, onSetVisibility } = this.props
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => onSetVisibility(false)}
                >
                    <View style={styles.background}>
                        <Text style={styles.headingText}>Was möchtest du erstellen?</Text>
                        <View style={styles.window}>
                            <TouchableOpacity style={styles.windowButtons} onPress={() => onNavigateToCardCreator("MC")}>
                                <Text style={styles.buttonText}>Multiplechoice</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.windowButtons, { marginTop: 20 }]} onPress={() => onNavigateToCardCreator("SC")}>
                                <Text style={styles.buttonText}>Singlechoice</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.windowButtons, { marginTop: 20 }]} onPress={() => onNavigateToCardCreator("FT")}>
                                <Text style={styles.buttonText}>Freitext</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa',
    },
    window: {
        width: '80%',
        height: '20%',
        borderRadius: 5
    },
    windowButtons: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'grey',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: 'white',
        margin: 10,
        fontSize: 20,
        fontStyle: 'italic'
    },
    buttonText: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10
    },
    saveButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'green',

    },


});
