import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const ConsumerDashboard = ({ navigation }) => {
  const handleViewItemPress = () => {
    navigation.navigate('ViewItem');
  };

  

  return (
    <ImageBackground
    source={require('../../assets/Background4.jpg')} // Replace with the actual path to your image
    style={styles.backgroundImage}
    blurRadius={5}
    >
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!!!</Text>
      <Text style={styles.header2}>Let's find a farm close to you</Text>
      <View style={styles.buttonContainer}>
        <Button title="View Item" onPress={handleViewItemPress} />
        
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
  buttonContainer: {
    backgroundColor: 'white', //#4bab79
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 50,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 90,
    marginTop: 0,
    color:'white'
  },
  header2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:20,
    color:'white'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
});

export default ConsumerDashboard;