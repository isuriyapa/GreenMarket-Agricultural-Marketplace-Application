import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const MembershipSuccessScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navigation = useNavigation();
  async function checkAuthentication() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    const userRole = await AsyncStorage.getItem('userRole');
    membership = await AsyncStorage.getItem('membership');
    console.log(userUID, userRole, membership);

    if (membership==='true') {
        navigation.navigate('ConsumerHome');
    }

    useFocusEffect(
      useCallback(() => {
          checkAuthentication();
      }, [])
  );
    }
  return (
    <View style={styles.container}>
      <Image source={require('./membership.webp')} style={styles.membershipImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.membershipTitle}>Premium Membership</Text>
        <Text style={styles.membershipDescription}>
          Get exclusive access to the bidding system feature and more with our premium membership.
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.featureText}>- Unlimited Bidding Opportunities</Text>
        <Text style={styles.featureText}>- Access to Exclusive Auctions</Text>
        <Text style={styles.featureText}>- Early Bidding Access</Text>
        <Text style={styles.featureText}>- Priority Customer Support</Text>
      </View>

      <TouchableOpacity style={styles.subscribeButton}
       onPress={() => {
        // Navigate to the bidding section or the appropriate screen
        navigation.navigate('PaymentScreen');
      }}>
        <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    padding: 30,
  },
  membershipImage: {
    alignSelf:'center',
    width: 250,
    height: 240,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  membershipTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  membershipDescription: {
    fontSize: 16,
    color: '#555',
  },
  featuresContainer: {
    marginTop: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  subscribeButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MembershipDetailsScreen;