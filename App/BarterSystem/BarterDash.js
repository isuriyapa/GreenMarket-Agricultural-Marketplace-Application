import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Header from '../SharedComponents/Header';

import { useEffect, useCallback } from 'react';
import { useState } from 'react';

import { getDatabase, ref, push, get } from 'firebase/database';
import {app} from '../Firebase/FirebaseConfig';

export default function BarterDash() {

  const navigation = useNavigation();

  const [userId, setUserId] = useState(null);
  const [userLog, setUserLog] = useState(null);

  async function fetchData() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    console.log('USER ID: ', userUID);
    setUserId(userUID);
  }

  const database = getDatabase(app);
  const userRef = ref(database, `users/${userId}`);

  function dataFetch() {
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // The data exists, and you can access it using snapshot.val()
          const data = snapshot.val();
          setUserLog(data);
          console.log(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {

  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      dataFetch();
    }, [userId])
  );

  return (
    <View style={styles.mainContainer}>

      <Header />

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to GreenMarket!</Text>
        <Text style={styles.descriptionText}>
          Buy & Sell foods, or exchange agricultural stuff in one place...
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Offers')}
        >
          <Text style={styles.buttonText}>OFFERS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BarterMain")}
        >
          <Text style={styles.buttonText}>REQUESTS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BarterInbox')}
        >
          <Text style={styles.buttonText}>BARTER INBOX</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BarterExchange")}
        >
          <Text style={styles.buttonText}>EXCHANGE</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    //paddingHorizontal: 16,
    //paddingTop: 40,
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
