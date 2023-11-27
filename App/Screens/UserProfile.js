import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../Firebase/FirebaseConfig';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../SharedComponents/Header';

const UserProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  async function checkAuthentication() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    setUserId(userUID);
  }

  useEffect(() => {
    checkAuthentication();
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        if (!userData) {
          const database = getDatabase(app);
          const userRef = ref(database, `users/${userId}`);

          try {
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
              // The data exists, and you can access it using snapshot.val()
              const data = snapshot.val();
              setUserData(data);
              console.log(data);
            } else {
              console.log("No data available");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }

      fetchData();
    }, [userId, userData])
  );




  const handleLogout = async () => {
    // Remove the user's ID from AsyncStorage
    await AsyncStorage.removeItem('loggedInUserId');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('membership');

    navigation.navigate("SignIn");
  };

  return (
    <><Header />
      <View style={styles.container}>

        <Image source={require('../../assets/sample_profile_picture_Profile-Transparent.png')} style={styles.profileImage} />
        {userData ? (
          <>
            <Text style={styles.userName}>
              {userData.firstName} {userData.lastName}
            </Text>

            <Text style={styles.userEmail}>{userData.email}</Text>

            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoLabel}>District:</Text>
              <Text style={styles.userInfoText}>{userData.district}</Text>
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoLabel}>Phone:</Text>
              <Text style={styles.userInfoText}>{userData.phoneNumber}</Text>
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoLabel}>Gender:</Text>
              <Text style={styles.userInfoText}>{userData.gender}</Text>
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoLabel}>Account Type:</Text>
              <Text style={styles.userInfoText}>{userData.accountType}</Text>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleLogout}>
              <Text style={styles.editButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View></View>
        )}

      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 25
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center'
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 15
  },
  userInfoContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginHorizontal: 50
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoText: {
    fontSize: 14,
  },
  editButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,

    marginTop: 'auto',
    width: 100,
    alignSelf: 'center',
    marginBottom: 30
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
});

export default UserProfile;