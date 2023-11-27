import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../Firebase/FirebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import Header from '../SharedComponents/Header';

const SignUp = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    district: '',
    email: '',
    phoneNumber: '',
    gender: 'Male',
    accountType: 'Farmer',
    password: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const auth = getAuth(app);

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const userUID = user.uid;
      // Store user UID in AsyncStorage for future reference
      await AsyncStorage.setItem('loggedInUserId', userUID);

      const database = getDatabase(app);
      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        district: formData.district,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        accountType: formData.accountType,
        membership: false,
      });
      /*const database = getDatabase(app);
      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        username: formData.username,
        email: formData.email,
      });*/

      setSuccessMessage('User registered successfully!');
      // Redirect to another page after a short delay (e.g., 2 seconds)
      // You can use navigation to navigate to another screen
      setTimeout(() => {
        // Navigate to another screen or perform any action after signup
        navigation.navigate('SignIn')
      }, 1000);
    } catch (error) {
      setErrorMessage('Error creating user: ' + error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleChange('firstName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleChange('lastName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(value) => handleChange('address', value)}
          />
          <View style={styles.districtPickerContainer}>
            <Picker
              style={styles.districtPicker}
              selectedValue={formData.district}
              onValueChange={(value) => handleChange('district', value)}
            >
              {/* Add options for Districts 1, 2, 3, ..., 20 */}
              <Picker.Item label="Matara" value="Matara" />
              <Picker.Item label="Hambantota" value="Hambantota" />
              <Picker.Item label="Galle" value="Galle" />
              <Picker.Item label="Jaffna" value="Jaffna" />
              <Picker.Item label="Kilinochchi" value="Kilinochchi" />
              <Picker.Item label="Mannar" value="Mannar" />
              <Picker.Item label="Mullaitivu" value="Mullaitivu" />
              <Picker.Item label="Vavuniya" value="Vavuniya" />
              <Picker.Item label="Puttalam" value="Puttalam" />
              <Picker.Item label="Kurunegala" value="Kurunegala" />
              <Picker.Item label="Gampaha" value="Gampaha" />
              <Picker.Item label="Colombo" value="Colombo" />
              <Picker.Item label="Kalutara" value="Kalutara" />
              <Picker.Item label="Anuradhapura" value="Anuradhapura" />
              <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
              <Picker.Item label="Matale" value="Matale" />
              <Picker.Item label="Kandy" value="Kandy" />
              <Picker.Item label="Nuwara Eliya" value="Nuwara Eliya" />
              <Picker.Item label="Kegalle" value="Kegalle" />
              <Picker.Item label="Ratnapura" value="Ratnapura" />
              <Picker.Item label="Trincomalee" value="Trincomalee" />
              <Picker.Item label="Batticaloa" value="Batticaloa" />
              <Picker.Item label="Ampara" value="Ampara" />
              <Picker.Item label="Badulla" value="Badulla" />
              <Picker.Item label="Monaragala" value="Monaragala" />
              {/* Add more options for Districts 2, 3, ..., 20 */}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(value) => handleChange('phoneNumber', value)}
          />
          <View style={styles.radioGroup}>
            <Text style={styles.label}>Gender:</Text>
            <TouchableOpacity
              style={[styles.radio, formData.gender === 'Male' && styles.selectedRadio]}
              onPress={() => handleChange('gender', 'Male')}
            >
              <Text>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radio, formData.gender === 'Female' && styles.selectedRadio]}
              onPress={() => handleChange('gender', 'Female')}
            >
              <Text>Female</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.radioGroup}>
            <Text style={styles.label}>Account Type:</Text>
            <TouchableOpacity
              style={[styles.radio, formData.accountType === 'Farmer' && styles.selectedRadio]}
              onPress={() => handleChange('accountType', 'Farmer')}
            >
              <Text>Farmer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radio, formData.accountType === 'Consumer' && styles.selectedRadio]}
              onPress={() => handleChange('accountType', 'Consumer')}
            >
              <Text>Consumer</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
          {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'blue', fontWeight: '600', fontSize: 16 }}>Already a member? Login here...</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 35,
    marginTop: -35,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  districtPickerContainer: {
    marginBottom: 10,
  },
  districtPicker: {
    height: 40,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align radio buttons to the right
    marginBottom: 10,
  },
  radio: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedRadio: {
    backgroundColor: 'lightblue',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
  },
  successMessage: {
    marginTop: 10,
    color: 'green',
  },
});

export default SignUp;
