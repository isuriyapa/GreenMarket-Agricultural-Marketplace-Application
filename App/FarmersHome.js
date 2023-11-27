import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from './SharedComponents/Header';

const FarmersHome = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            {/* <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="menu" size={24} color="white" />
                </TouchableOpacity>
                {/* <Image source={require('../assets/Picture2.png')} style={{ width: 200, height: 22 }} /> */}
            {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>GREEN MARKET</Text>
                <TouchableOpacity>
                    <Ionicons name="chatbox-ellipses" size={24} color="white" />
                </TouchableOpacity>
            </View> */}
            <Header />

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FramerDashboard')}>
                    <Image source={require('../assets/Picture1.png')} style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Marketplace</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BarterMain')}>
                    <Image source={require('../assets/Barter.png')} style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Barter System</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BiddingView')}>
                    <Image source={require('../assets/Picture1.png')} style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Bid System</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2E7D32',
        marginTop: 35,
    },
    appName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: -30, // To create a half-circle effect
    },
    button: {
        backgroundColor: 'white',
        padding: 7.5,
        borderRadius: 10,
        width: 100, // Adjust the width as needed
        height: 100,
        alignItems: 'center',
    },
    buttonIcon: {
        width: 40,
        height: 40,
    },
    buttonText: {
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default FarmersHome;
