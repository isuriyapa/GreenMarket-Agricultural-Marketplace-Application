import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Home from '../Home';
import BarterDash from '../BarterSystem/BarterDash';
import BarterMain from '../BarterSystem/Publisher/RequestsMain';
import PostNewRequest from '../BarterSystem/Publisher/PostNewRequest';
import BarterInbox from '../BarterSystem/BarterInbox';
import UserProfile from '../Screens/UserProfile';
import FarmersHome from '../FarmersHome';
import ForumList from '../Forum/ForumList';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarterExchange from '../BarterSystem/Viewer/BarterExchange';

const TabNavigation = () => {
    const TabNavs = createBottomTabNavigator();

    const navigation = useNavigation();

    async function checkAuthentication() {
        const userUID = await AsyncStorage.getItem('loggedInUserId');
        const userRole = await AsyncStorage.getItem('userRole');
        console.log(userUID, userRole);

        if (userUID && (userRole === 'Consumer')) {
            navigation.navigate('BTabNavigationConsumer');
        }
    }

    useFocusEffect(
        useCallback(() => {
            checkAuthentication();
        }, [])
    );
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TabNavs.Navigator initialRouteName={'FarmersHome'} screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, }}>
                <TabNavs.Screen name="FarmersHome" component={FarmersHome} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<Ionicons name='ios-home' size={size} color={color} />) }} />
                <TabNavs.Screen name="Forum" component={ForumList} options={{ tabBarLabel: 'Forum', tabBarIcon: ({ color }) => (<Ionicons name="chatbubbles-sharp" size={24} color={color} />) }} />
                <TabNavs.Screen name="BarterExchange" component={BarterExchange} options={{ tabBarLabel: 'Barter', tabBarIcon: ({ color }) => (<FontAwesome name="handshake-o" size={24} color={color} />) }} />
                <TabNavs.Screen name="UserProfile" component={UserProfile} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color }) => (<FontAwesome name="user" size={24} color={color} />) }} />
            </TabNavs.Navigator>
        </KeyboardAvoidingView>
    )
}

export default TabNavigation