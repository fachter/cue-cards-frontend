import React, { useContext } from 'react';
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
import { ProfileContext } from './ProfileProvider'
import { UserContext } from '../LoginRegistrationScreen/UserProvider';




const ProfileScreen = () => {

    const {
        image,
        profileImage,
        showAddImage,
        setShowAddImage
    } = useContext(ProfileContext)

    const { userImage, email, nickName } = useContext(UserContext)



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image source={{ uri: userImage }} size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{nickName}</Title>
                        <Caption style={styles.caption}>@matze96</Caption>
                        <Caption style={styles.caption}>CueCarder seit 2020</Caption>

                    </View>

                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
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