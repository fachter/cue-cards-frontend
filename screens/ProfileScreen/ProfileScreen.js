import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
    Button,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import Share from 'react-native-share';

//import files from '../assets/filesBase64';

const ProfileScreen = () => {

    /* const myCustomShare = async () => {
        const shareOptions = {
            message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
            url: files.appLogo,
            // urls: [files.image1, files.image2]
        }

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    } */;

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={
                            require('../../assets/Passbild.jpg')
                        }
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Matthias Meyer</Title>
                        <Caption style={styles.caption}>@matze96</Caption>
                        <Caption style={styles.caption}>CueCarder seit 2020</Caption>

                    </View>
                    
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>matze96@email.com</Text>
                </View>
            </View>

                <Button
                title="Profilbild bearbeiten"
                />


        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3136",

    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        color: '#777777'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    
});