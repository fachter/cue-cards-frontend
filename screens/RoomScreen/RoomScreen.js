import React from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';

const Rooms = [
    {
        id: 1,
        title: "Winf"
    },
    {
        id: 2,
        title: "Wirtschaftsinformatik"
    },
    {
        id: 1,
        title: "Clara und ich"
    },

]

function Item({title}) {
    return (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>


    );
}

export default function RoomScreen() {

    

    

        return(
            <View style = {styles.container}>
                <FlatList
                data={Rooms}
                renderItem={({item}) => <Item title={item.title}/>}
                keyExtractor={item => item.id}
                />
                
                <Button
                    style={styles.plusButton}
                    title="Raum erstellen"
                    color="black"
                />
                
            </View>
            


        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    plusButton: {
        marginBottom: 50,
    }
});