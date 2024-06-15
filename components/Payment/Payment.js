import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';

const Payment = () => {
  const [bills, setBills] = useState([]);
  const navigation = useNavigation();
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchBills();
    fetchToken();
  }, []);

  const fetchBills = async () => {
    try {
      const api = await authApi();
      const response = await api.get(endpoints.payment);
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching payment:', error);
    }
  };

  const fetchToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  const handleMomoPayment = (bill) => {
    navigation.navigate('MomoPayment', { bill });
  };

  const handleVNPayPayment = (bill) => {
    // Gọi Navigative đến màn hình VNPay
    // navigation.navigate('VNPayPayment', { bill });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.billContainer}>
            <Text style={styles.content}>
              <Text style={styles.text}>Loại hóa đơn:   </Text>
              <Text>  {item.bill_type}</Text>
            </Text>
            <Text style={styles.content}>
              <Text style={styles.text}>Số tiền thanh toán:   </Text>
              <Text>  {item.amount} đồng</Text>
            </Text>
            <Text style={styles.content}>
              <Text style={styles.text}>Ngày phát hành:   </Text>
              <Text>  {item.issue_date}</Text>
            </Text>
            <Text style={styles.content}>
              <Text style={styles.text}>Ngày hết hạn:   </Text>
              <Text>  {item.due_date}</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Thanh toán qua Momo" onPress={() => handleMomoPayment(item)} />
              <Button title="Thanh toán qua VNPay" onPress={() => handleVNPayPayment(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },

  billContainer: {
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
  },

  content: {
    fontSize: 18,
  },

  text: {
    color: 'green',
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Payment;
