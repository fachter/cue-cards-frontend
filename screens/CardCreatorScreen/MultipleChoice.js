import React, { useContext, useState } from 'react'
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Dimensions, Text, TouchableWithoutFeedback } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const data = [
]



export default class MultipleChoice extends React.Component {

    state = {
        answers: this.props.answers
    }

    _addItem() {
        var copy = this.state.answers
        copy.push({
            ID: this.state.answers.length,
            text: '',
        })

        this.setState({ answers: copy })
    }



    _deleteItemById(id) {
        var copy = this.state.answers
        var index

        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].ID === id)
                index = i
        }
        copy.splice(index, 1)  //schmeißt das Item mit dem Index raus
        this.setState({ answers: copy })
    }


    _updateAnswerText(text, id) {
        var copy = this.state.answers
        var index
        for (var i = 0; i < copy.length; i++) {  //Sucht den Index des Items im Array nach id
            if (copy[i].ID === id)
                index = i
        }
        copy[index].text = text
        this.setState({ answers: copy })
    }

    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => this._addItem()}>
                    <View style={styles.addButton}>

                    </View>
                </TouchableOpacity>
                <View style={styles.answers}>
                    <ScrollView>
                        <FlatList
                            data={this.state.answers}
                            renderItem={({ item }) => (
                                <AnswerItem
                                    item={item}
                                    getText={this._updateAnswerText.bind(this)}
                                    deleteCallback={this._deleteItemById.bind(this)}
                                />
                            )}
                            keyExtractor={item => item.answerID}
                            ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
                        />
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.bottomView} onPress={() => this.props.onSave()}>
                    <View style={styles.saveButton}>
                        <Text style={{ fontStyle: 'italic', fontSize: 20, color: 'white' }}>speichern</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

class AnswerItem extends React.Component {
    render() {
        const { item } = this.props
        return (
            <View style={styles.answeritem}>
                <TextInput style={styles.answerInput} placeholder="Antwort" onChangeText={text => this.props.getText(text, item.ID)}>
                    {item.text}
                </TextInput>
                <TouchableOpacity onPress={() => this.props.deleteCallback(this.props.id)}>
                    <View style={styles.deleteButton} />
                </TouchableOpacity>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    answers: {
        flex: 3,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#848a91',
        margin: 20,
    },
    answeritem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 20,
    },
    answerInput: {
        flex: 1,
        borderColor: '#848a91',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 15,
        fontStyle: 'italic',
        padding: 5
    },
    deleteButton: {
        height: 20,
        width: 20,
        backgroundColor: 'black',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10
    },
    addButton: {
        height: 20,
        width: 20,
        backgroundColor: 'black',
        alignSelf: 'flex-end',
        marginRight: 20
    },
    listSeperator: {
        // height: StyleSheet.hairlineWidth,
        //backgroundColor: 'green'
    },
    bottomView: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: '#2c2e30',
        height: 40,
        width: 130,
        borderRadius: 30,
        top: 0,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'

    },


});