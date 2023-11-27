// ForumList.js
import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const Option = ({ navigation }) => {
  const handleViewItemPress = () => {
    navigation.navigate('ConsumerDashboard');
  };

  const handleAddItemPress = () => {
    navigation.navigate('FramerDashboard');
  };

  return (
    <ImageBackground
    source={require('../../assets/smart-farming.jpg')} // Replace with the actual path to your image
    style={styles.backgroundImage}
    >
    <View style={styles.container}>
      {/* <Text style={styles.header}>Welcome!!!</Text> */}
      <View style={styles.buttonContainer}>
        <Button title="Consumer" onPress={handleViewItemPress} />  
      </View>

      <View style={styles.buttonContainer}>
      <Button title="Farmer" onPress={handleAddItemPress} />      
      </View>
      
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 90,
    marginTop: 0,
    //color: 'white',
   
  },
  buttonContainer: {
    backgroundColor: 'white',  //#3AB918
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 50,
    width: 140,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
});

export default Option;