import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';

const SignIn = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const userUID = user.uid;
      console.log('User logged in successfully:', user.email);

      // Handle successful login
      // You can add your own logic after successful login

      //await AsyncStorage.removeItem('loggedInUserId');

      // Store user UID in AsyncStorage for future reference
      await AsyncStorage.setItem('loggedInUserId', userUID);

      
        const database = getDatabase(app);
        const userRef = ref(database, `users/${userUID}`);

        try {
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            // The data exists, and you can access it using snapshot.val()
            const data = snapshot.val();
            await AsyncStorage.setItem('userRole', data.accountType);
            await AsyncStorage.setItem('membership', data.membership.toString());
            console.log('Retrieved user TYPE:', data.accountType);
            console.log(data);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      
      // Navigate to another screen or perform any action after login
      // For example, you can use navigation.navigate('Home') to navigate to the home screen
      navigation.navigate('BTabNavigation');

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  /*const retrieveUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails !== null) {
        // Parse the JSON string to get the user object
        const user = JSON.parse(userDetails);

        // Do something with the user details
        console.log('Retrieved user details:', user);
      }
    } catch (error) {
      console.error('Error retrieving user details:', error);
    }
  };

  retrieveUserDetails();*/

  return (
    <>

      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ textAlign: 'center', marginTop: 20, color: 'blue', fontWeight: '600', fontSize: 16 }}>Not a member? Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignIn;