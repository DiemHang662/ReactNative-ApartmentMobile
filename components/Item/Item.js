import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';

const Item = () => {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

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

  const fetchItems = async () => {
    try {
      const api = await authApi();
      const response = await api.get(endpoints.items);
      const items = response.data;
      setItems(items);
      checkPendingItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const checkPendingItems = (items) => {
    const pending = items.filter(item => item.status === 'PENDING');
    if (pending.length > 0) {
      Alert.alert(
        'Thông báo',
        `Bạn có ${pending.length} món hàng đang chờ nhận.`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  const renderItems = () => {
    return items.map(item => (
      <View style={styles.h3} key={item.id}>
        <Text style={styles.h6}>
          <Text style={styles.text}>Tên hàng: </Text>
          <Text>{item.name}</Text>
        </Text>

        <Text style={styles.h6}>
          <Text style={styles.text}>Trạng thái: </Text>
          <Text>{item.status}</Text>
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>TỦ HÀNG ĐIỆN TỬ</Text>
      {renderItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 60,
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  h3: {
    paddingVertical: 30,
    fontSize: 25,
  },
  h6: {
    fontSize: 20,
    paddingLeft: 20,
    color: 'black',
  },
  
  text: {
    color: 'green',
    padding: 10,
    fontWeight: 'bold',
  },
});

export default Item;
