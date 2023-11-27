import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MembershipDetailsScreen = ({navigation}) => {
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
    padding: 20,
  },
  membershipImage: {
    alignSelf:'center',
    width: '80%',
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