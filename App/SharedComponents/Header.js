import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('FarmersHome')}>
                <Ionicons name="home" size={24} color="white" />
            </TouchableOpacity>
            {/* <Image source={require('../assets/Picture2.png')} style={{ width: 200, height: 22 }} /> */}
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>GREEN MARKET</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                <Ionicons name="chatbox-ellipses" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

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
})