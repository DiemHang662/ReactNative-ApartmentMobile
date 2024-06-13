import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const Feedback = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState('');
  const [resident] = useState('1'); 

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

  const addFeedback = async () => {
    try {
      const response = await fetch("http://192.168.1.6:8000/api/feedback/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "title": title,
          "content": content,
          "resident": resident,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.info(data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.h1}>PHẢN ÁNH TÌNH TRẠNG CHUNG CƯ</Text>

      <Input
        label="Chủ đề phản ánh" labelStyle={{ color: 'green'}}
        placeholder="Nhập tiêu đề phản ánh..."
        value={title}
        onChangeText={(text) => setTitle(text)}
        multiline numberOfLines={3}
        containerStyle={styles.inputContainer}
      />

      <Input
        label="Nội dung phản ánh: " labelStyle={{ color: 'green'}}
        placeholder="Nhập nội dung phản ánh..."
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline numberOfLines={6}
        containerStyle={styles.inputContainer}
      />

      <Button
        title="  Gửi"
        onPress={addFeedback}
        icon={<Icon name="send" size={20}  color={'white'}/>} // Icon gửi từ MaterialCommunityIcons
        buttonStyle={styles.button}
        disabled={!title || !content}
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

export default Feedback;
