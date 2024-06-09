import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feedback = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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

  const addFeedback = () => {
    fetch("https://diemhang.pythonanywhere.com/api/feedback/", {
      method: "POST",
      body: JSON.stringify({
        "title": title,
        "content": content,
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
      <Text style={styles.h1}>PHẢN ÁNH TÌNH TRẠNG CHUNG CƯ</Text>
      <Input
        label="Tên phản ánh" placeholder="Nhập tiêu đề phản ánh..."  value={title}
        onChangeText={text => setTitle(text)} containerStyle={styles.inputContainer}
      />

      <Input
        label="Nội dung phản ánh của bạn" placeholder="Nhập nội dung phản ánh..."
        value={content} onChangeText={text => setContent(text)}
        multiline numberOfLines={6} containerStyle={styles.inputContainer}
      />

      <Button
        title="Gửi phản ánh" onPress={addFeedback} buttonStyle={styles.button} />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
    padding:5,
  },
});

export default Feedback;
