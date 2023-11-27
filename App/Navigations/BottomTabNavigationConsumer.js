import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Home from '../Home';
import UserProfile from '../Screens/UserProfile';
import FarmersHome from '../FarmersHome';
import BidsView from '../BidSystem/Consumer/BidsView';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import BidViewTabFarmer from '../BidSystem/BidViewTabConsumer';
import MembershipDetailsScreen from '../BidSystem/Membership/MembershipDetailsScreen';

const BottomTabNavigationConsumer = () => {

    const TabNavsII = createBottomTabNavigator();

    const navigation = useNavigation();

    var membership;

    async function checkAuthentication() {
        const userUID = await AsyncStorage.getItem('loggedInUserId');
        const userRole = await AsyncStorage.getItem('userRole');
        membership = await AsyncStorage.getItem('membership');
        console.log(userUID, userRole, membership);

        if (userUID && (userRole === 'Farmer')) {
            navigation.navigate('BTabNavigation');
        }
    }

    useFocusEffect(
        useCallback(() => {
            checkAuthentication();
        }, [])
    );

    return (
        <TabNavsII.Navigator initialRouteName={'ConsumerHome'} screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, }}>
            {/* {membership === 'false' ?
                <TabNavsII.Screen name="ConsumerHome" component={MembershipDetailsScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<FontAwesome name="gavel" size={24} color={color} />) }} /> :
                <TabNavsII.Screen name="ConsumerHome" component={BidViewTabFarmer} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<FontAwesome name="gavel" size={24} color={color} />) }} />}
             */}
            <TabNavsII.Screen name="ConsumerHome" component={BidViewTabFarmer} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<FontAwesome name="gavel" size={24} color={color} />) }} />
            {/* <TabNavsII.Screen name="ConsumerHome" component={membership==='true' ? BidViewTabFarmer : MembershipDetailsScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<FontAwesome name="gavel" size={24} color={color} />) }} /> */}

            <TabNavsII.Screen name="BidsView" component={BidsView} options={{ tabBarLabel: 'Marketplace', tabBarIcon: ({ color }) => (<FontAwesome name="handshake-o" size={24} color={color} />) }} />
            <TabNavsII.Screen name="UserProfile" component={UserProfile} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color }) => (<FontAwesome name="user" size={24} color={color} />) }} />
        </TabNavsII.Navigator>
    )
}


export default BottomTabNavigationConsumer;