import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import { ListStructureContext } from '../HomeScreen/ListStructureProvider'
import logo from '../../assets/Logo_grau.png';

import uuid from 'react-native-uuid'


export default class Vocable extends React.Component {

    static contextType = ListStructureContext

    state = {
        id: this._isValueNull(this.props.route.params.id) ? uuid.v1() : this.props.route.params.id,
        cardType: "FT",
        cardLevel: this._isValueNull(this.props.route.params.cardLevel) ? 0 : this.props.route.params.cardLevel,
        questionText: this._isValueNull(this.props.route.params.questionText) ? '' : this.props.route.params.questionText,
        solution: this._isValueNull(this.props.route.params.solution) ? '' : this.props.route.params.solution,
        questionInputHeight: 0,
        answerInputHeight: 0,

    }

    _isValueNull(value) {
        if (value === undefined) {
            return true
        }
        return false
    }



    _saveAndGoBack() {
        this._save()
        this.props.navigation.goBack()
    }


    _saveAndNew() {
        this._save()
        this.setState({ id: uuid.v1() })
        this.setState({ questionText: '' })
        this.setState({ solution: [] })
    }



    _save() {

        const { id, cardType, questionText, solution } = this.state
        const folders = this.context

        let newCard = {
            id: id,
            cardType: cardType,
            questionText: questionText,
            cardLevel: 0,    //Beim bearbeiten einer Karte wird das Level zurück auf 0 gesetzt
            solution: solution
        }

        let updatedCards = folders.currentListStructure

        if (this.props.route.params.mode == "createMode") { // neue Karte erstellen
            updatedCards.push(newCard)


        } else if (this.props.route.params.mode == "editMode") {   //alte Karte aktualisieren
            var index
            for (var i = 0; i < updatedCards.length; i++) {
                if (updatedCards[i].id === id) {
                    index = i
                }
                updatedCards[index] = newCard
            }
        }
        folders.setCurrentListStructure(updatedCards, true)

    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.textInput]}
                    multiline={true}
                    placeholder="Frage eingeben"
                    placeholderTextColor="grey"
                    onContentSizeChange={(event) => this.setState({ questionInputHeight: event.nativeEvent.contentSize.height })}

                    onChangeText={text => this.setState({ questionText: text })}>
                    {this.state.questionText}
                </TextInput>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Antwort eingeben"
                    placeholderTextColor="grey"
                    onContentSizeChange={(event) => this.setState({ answerInputHeight: event.nativeEvent.contentSize.height })}
                    onChangeText={text => this.setState({ solution: text })}>
                    {this.state.solution}
                </TextInput>
                <View style={styles.bottomView} >
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndGoBack()}>
                        <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this._saveAndNew()}>
                        <Text style={{ fontStyle: 'italic', fontSize: 13, color: 'white' }}>Speichern und Neu</Text>
                    </TouchableOpacity>
                </View>
                <Image source={logo} style={styles.logo} />
            </View >

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",
        paddingTop: 25
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
    textInput: {
        paddingLeft: 15,
        padding: 7,
        marginBottom: 25,
        borderRadius: 10,
        color: 'black',
        margin: 20,
        fontSize: 15,
        fontStyle: 'italic',
        backgroundColor: '#C7C7C7'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'

    },
    logo: {
        position: 'absolute',
        width: 110,
        height: 42,
        bottom: -5,
        alignSelf: 'center',
    },
});