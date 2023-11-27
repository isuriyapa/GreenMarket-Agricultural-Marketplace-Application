import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    navigation.navigate('MembershipSuccessScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentTitle}>Payment Details</Text>
      <View style={styles.cardInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput, styles.marginRight]}
            placeholder="Expiration Date (MM/YY)"
            value={expirationDate}
            onChangeText={setExpirationDate}
          />
          <TextInput
            style={[styles.input, styles.halfInput, styles.marginLeft]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
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
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardInputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  halfInput: {
    flex: 1,
  },
  marginRight: {
    marginRight: 8, // Add appropriate margin to create spacing
  },
  marginLeft: {
    marginLeft: 8, // Add appropriate margin to create spacing
  },
  payButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;