import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostNewRequest from '../BarterSystem/Publisher/PostNewRequest';
import Requests from '../BarterSystem/Publisher/Requests';

const Tab = createMaterialTopTabNavigator();

const BarterRequestsTopNavigation = () => {
  const requests = []; // Replace with your list of requests

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarLabel: ({ focused }) => {
        const isFocused = focused ? styles.tabLabelFocused : styles.tabLabel;
        return (
          <Text style={isFocused}>
            {route.name}
          </Text>
        );
      }
      ,
      tabBarActiveTintColor: 'green', // Set the active text color
      tabBarPressColor: 'blue',
      tabBarIndicatorStyle: { backgroundColor: 'green' }, // Set the background color of the selected tab
      tabBarStyle: { backgroundColor: 'white' }, // Set the background color for the entire tab bar
      tabBarActiveBackgroundColor: 'green', // Set the background color for the selected tab
      //tabBarStyle: {backgroundColor: 'green',},
    })}

      barStyle={{ backgroundColor: 'green' }}
      
      //style={{ marginTop: 35 }}
      >
      <Tab.Screen name="My Requests" component={Requests} />
      <Tab.Screen name="New Request" component={PostNewRequest} />
    </Tab.Navigator>
  );
};

export default BarterRequestsTopNavigation;

const styles = StyleSheet.create({
  tabLabel: {
    fontWeight: 'normal', // Adjust as needed
  },
  tabLabelFocused: {
    fontWeight: 'bold', // Make the text bold for the focused tab
    color: 'black',
  },
});