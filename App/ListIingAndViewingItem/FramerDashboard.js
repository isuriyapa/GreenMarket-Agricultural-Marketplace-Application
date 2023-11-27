import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import Header from '../SharedComponents/Header';

const FramerDashboard = ({ navigation }) => {
  const handleViewItemPress = () => {
    navigation.navigate('FarmerListItem');
  };

  const handleAddItemPress = () => {
    navigation.navigate('AddItem');
  };



  return (
    <>
      <Header />
      <ImageBackground
        source={require('../../assets/backgroung.avif')} // Replace with the actual path to your image
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Welcome!!!</Text>
          <Text style={styles.header2}>Let's find a farm close to you</Text>
          <View style={styles.buttonContainer}>
            <Button title="View Item" onPress={handleViewItemPress} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Add Item" onPress={handleAddItemPress} />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#3AB918',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 50,
    width: 130,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 90,
    marginTop: 0,
    color: 'white'
  },
  header2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: 'white'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
});

export default FramerDashboard;