import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigation from './App/Navigations/BottomTabNavigation';

import BarterRequests from './App/BarterSystem/Publisher/RequestsMain';
import PostNewRequest from './App/BarterSystem/Publisher/PostNewRequest';
import Requests from './App/BarterSystem/Publisher/Requests';
import Offers from './App/BarterSystem/Publisher/Offers';
import BarterMain from './App/BarterSystem/Publisher/RequestsMain';
import BarterInbox from './App/BarterSystem/BarterInbox';
import SignIn from './App/Authentication/SignIn';
import SignUp from './App/Authentication/SignUp';
import FarmersHome from './App/FarmersHome';
import ChatScreen from './App/Screens/ChatScreen';
import BarterExchange from './App/BarterSystem/Viewer/BarterExchange';
import BarterAvailableOptions from './App/BarterSystem/Publisher/BarterAvailableOptions';

import UserProfile from './App/Screens/UserProfile';

import BidsView from './App/BidSystem/Consumer/BidsView';
import ItemDetailsScreen from './App/BidSystem/Consumer/ItemDetailsScreen';
import BiddingSlider from './App/BidSystem/Consumer/BiddingSlider';
import MembershipDetailsScreen from './App/BidSystem/Membership/MembershipDetailsScreen';
import PaymentScreen from './App/BidSystem/Membership/PaymentScreen';
import BidForm from './App/BidSystem/Farmer/BidForm'
import DisplayBids from './App/BidSystem/Farmer/DisplayBids'
import BottomTabNavigation from './App/BidSystem/Farmer/BottomTabNavigation'
import ViewHighestBid from './App/BidSystem/Farmer/ViewHighestBid'
import ContactFarmer from './App/BidSystem/Consumer/ContactFarmer'
import BiddingView from './App/BidSystem/RequestsMain';

import ForumPost from './App/Forum/ForumPost';
import MyQuestions from './App/Forum/MyQuestions';
import ForumDetails from './App/Forum/ForumDetail';

import FramerDashboard from './App/ListIingAndViewingItem/FramerDashboard';
import FarmerListItem from './App/ListIingAndViewingItem/FarmerListItem';
import AddItem from './App/ListIingAndViewingItem/AddItem';
import BottomTabNavigationConsumer from './App/Navigations/BottomTabNavigationConsumer';
import BidViewTabFarmer from './App/BidSystem/BidViewTabConsumer';


const Stack = createStackNavigator();

export default function App() {

  const NavigationRef = useRef(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  /*useFocusEffect(
    useCallback(() => {
      checkAuthentication();
    }, [])
  );*/

  async function checkAuthentication() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    const userRole = await AsyncStorage.getItem('userRole');
    console.log(userUID, userRole);

    // You can use NavigationRef to navigate.
    if (userUID && (userRole === 'Farmer')) {
      NavigationRef.current?.navigate('BTabNavigation');
    } else if (userUID && (userRole === 'Consumer')) {
      NavigationRef.current?.navigate('BTabNavigationConsumer');
    } else {
      NavigationRef.current?.navigate('SignUp');
    }
  }/*
  async function checkAuthentication() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    const userRole = await AsyncStorage.getItem('userRole');
    console.log(userUID, userRole);

    // Clear user data on logout
    if (!userUID) {
      await AsyncStorage.removeItem('loggedInUserId');
      await AsyncStorage.removeItem('userRole');
    }

    // You can use NavigationRef to navigate.
    if (userUID && userRole === 'Farmer') {
      NavigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'BTabNavigation' }],
      });
    } else if (userUID && userRole === 'Consumer') {
      NavigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'BTabNavigationConsumer' }],
      });
    } else {
      NavigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'SignUp' }],
      });
    }
  }*/

  return (
    <View style={styles.container}>
      {/* <NavigationContainer>
        <TabNavigation />
      </NavigationContainer> */}
      <NavigationContainer ref={NavigationRef}>
        <Stack.Navigator initialRouteName={"SignUp"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BTabNavigation" component={TabNavigation} />
          <Stack.Screen name="BarterRequests" component={BarterRequests} />
          <Stack.Screen name="BarterMain" component={BarterMain} />
          <Stack.Screen name="BarterInbox" component={BarterInbox} />
          <Stack.Screen name="Requests" component={Requests} />
          <Stack.Screen name="BarterAvailableOptions" component={BarterAvailableOptions} />
          <Stack.Screen name="PostNewRequest" component={PostNewRequest} />
          <Stack.Screen name="Offers" component={Offers} />
          {/* <Stack.Screen name="FarmersHome" component={FarmersHome} /> */}
          <Stack.Screen name="BarterExchange" component={BarterExchange} />

          {/* <Stack.Screen name="BidsView" component={BidsView} options={{ title: 'Bids View' }} /> */}
          <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} options={{ title: 'ItemDetailsScreen' }} />
          <Stack.Screen name="BiddingSlider" component={BiddingSlider} />
          <Stack.Screen name="MembershipDetailsScreen" component={MembershipDetailsScreen} options={{ title: 'Membership' }} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment' }} />
          <Stack.Screen name="BidForm" component={BidForm} options={{ title: 'BidForm' }} />
          <Stack.Screen name="DisplayBids" component={DisplayBids} options={{ title: 'DisplayBids' }} />
          <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
          <Stack.Screen name="ViewHighestBid" component={ViewHighestBid} />
          <Stack.Screen name="ContactFarmer" component={ContactFarmer} />
          <Stack.Screen name="BiddingView" component={BiddingView} />
          <Stack.Screen name="BidViewTabConsumer" component={BidViewTabFarmer} />

          <Stack.Screen name="ForumPost" component={ForumPost} />
          <Stack.Screen name="MyQuestions" component={MyQuestions} />
          <Stack.Screen name="ForumDetail" component={ForumDetails} />

          <Stack.Screen name="FramerDashboard" component={FramerDashboard} />
          <Stack.Screen name="FarmerListItem" component={FarmerListItem} />
          <Stack.Screen name="AddItem" component={AddItem} />

          <Stack.Screen name="BTabNavigationConsumer" component={BottomTabNavigationConsumer} />

          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
