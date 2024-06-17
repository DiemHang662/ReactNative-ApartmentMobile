import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const Famember = () => {
  const [name, setName] = useState('');
  const [numberXe, setNumberXe] = useState('');
  const [token, setToken] = useState('');
  const [resident, setResident] = useState(null); 

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

  const addFamember = async () => {
    try {
      const response = await fetch("http://192.168.0.111:8000/api/famembers/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "numberXe": numberXe,
          "resident": resident,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.info(data);
      setName('');
      setNumberXe('');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
  
      <Input
        label="Mã cư dân" labelStyle={{ color: 'green'}}
        placeholder="Nhập mã cư dân..."
        value={resident}
        onChangeText={(text) => setResident(text)}
        multiline numberOfLines={3}
        containerStyle={styles.inputContainer}
      />

      <Input
        label="Họ và tên" labelStyle={{ color: 'green'}}
        placeholder="Nhập họ tên người thân..."
        value={name}
        onChangeText={(text) => setName(text)}
        multiline numberOfLines={3}
        containerStyle={styles.inputContainer}
      />

      <Input
        label="Biển số xe: " labelStyle={{ color: 'green'}}
        placeholder="Nhập biển số xe người thân..."
        value={numberXe}
        onChangeText={(text) => setNumberXe(text)}
        multiline numberOfLines={3}
        containerStyle={styles.inputContainer}
      />

      <Button
        title="  Gửi"
        onPress={addFamember}
        icon={<Icon name="send" size={20}  color={'white'}/>} // Icon gửi từ MaterialCommunityIcons
        buttonStyle={styles.button}
        disabled={!name || !numberXe}
      />

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 30,
    marginTop:15,
  },

  inputContainer: {
    marginBottom: 20,
    padding:10,
    borderWidth:0,
  },

  button: {
    backgroundColor: 'green',
    width:'30%',
    height:40,
    borderRadius:50,
    marginLeft:120,
  },
});

export default Famember;
