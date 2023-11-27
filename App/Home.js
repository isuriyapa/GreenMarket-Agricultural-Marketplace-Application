import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BarterDash from './BarterSystem/BarterDash';
import BarterView from './BarterSystem/Publisher/RequestsMain';
import PostNewRequest from './BarterSystem/Publisher/PostNewRequest';
import Requests from './BarterSystem/Publisher/Requests';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {

  const handleLogout = async () => {
    // Remove the user's ID from AsyncStorage
    await AsyncStorage.removeItem('loggedInUserId');
  };

  return (
    <View style={styles.mainContainer}>

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to GreenMarket!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FarmersHome')}
        >
          <Text style={styles.buttonText}>Farmers Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    width: 200,
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
