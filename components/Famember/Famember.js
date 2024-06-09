import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Famember = () => {
  const [name, setName] = useState('');
  const [numberXe, setNumberXe] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchToken();
  }, []);

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


  const addFamember = () => {
    fetch("https://diemhang.pythonanywhere.com/api/famembers/", {
      method: "POST",
      body: JSON.stringify({
        "name": name,
        "numberXe": numberXe,
        "resident": 3
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.info(data);
    })
    .catch(err => {
      console.error('There was a problem with your fetch operation:', err);
    });
  };


  return (
    <View style={styles.container}>
        <Text style={styles.h1}>Đăng kí xe cho người thân</Text>
      <Input
        label="Họ và tên" placeholder="Nhập họ tên người thân..."  value={name}
        onChangeText={text => setName(text)} containerStyle={styles.inputContainer}
      />

      <Input
        label="Biển số xe" placeholder="Nhập biển số xe người thân..."
        value={numberXe} onChangeText={text => setNumberXe(text)}
        multiline numberOfLines={2} containerStyle={styles.inputContainer}
      />

      <Button
        title="Đăng ký" onPress={addFamember} buttonStyle={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  title: {
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#009900',
  },

  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    textTransform:'uppercase',
    marginBottom: 30,
    padding:5,
  },
});

export default Famember;
