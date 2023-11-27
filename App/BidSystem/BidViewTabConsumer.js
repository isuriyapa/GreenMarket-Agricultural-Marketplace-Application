import { View, Text } from 'react-native'
import React from 'react'
import BarterRequestsTopNavigation from '../Navigations/BidViewConsumerTopNavigation';

import Header from '../SharedComponents/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export default function BidViewTabFarmer() {
  const navigation = useNavigation();
  async function checkAuthentication() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    const userRole = await AsyncStorage.getItem('userRole');
    membership = await AsyncStorage.getItem('membership');
    console.log(userUID, userRole, membership);

    if (membership==='false') {
        navigation.navigate('MembershipDetailsScreen');
    }

    useFocusEffect(
      useCallback(() => {
          checkAuthentication();
      }, [])
  );
}

  return (
    <>
    <Header/>
    <BarterRequestsTopNavigation />
    </>
  )
}