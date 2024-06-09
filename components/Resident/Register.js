import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Thực hiện xử lý đăng ký ở đây, ví dụ: gửi thông tin đăng ký đến server
    console.log('Họ:', firstname);
    console.log('Tên:', lastname);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.h1}>ĐĂNG KÝ NGƯỜI DÙNG</Text>
      <TextInput
        label="Firstname"
        value={firstname}
        onChangeText={text => setFirstname(text)}
        style={styles.input}
      />

    <TextInput
        label="Lastname"
        value={lastname}
        onChangeText={text => setLastname(text)}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        secureTextEntry
        style={styles.input}
      />

        <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
        />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Đăng ký
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor:'white',
  },

  h1: {
    fontSize: 25,
    color:'green',
    fontWeight: 'bold',
    margin: 30,
  },
 
  input: {
    margin: 20,
    width: '100%',
    backgroundColor:'#F0FFF0',
  }, 

  button: {
    marginTop: 10,
    width: '50%',
    backgroundColor:'green',
  },
});

export default Register;
