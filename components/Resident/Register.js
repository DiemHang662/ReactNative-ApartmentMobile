import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

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
        label="Họ người dùng..."
        value={firstname}
        onChangeText={text => setFirstname(text)}
        style={styles.input}
      />
      <TextInput
        label="Tên người dùng..."
        value={lastname}
        onChangeText={text => setLastname(text)}
        style={styles.input}
      />
      <TextInput
        label="Email..."
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={secureTextEntry}
          placeholder="Mật khẩu..."
          style={[styles.input, styles.passwordInput]}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Icon
            name={secureTextEntry ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={secureTextEntryConfirm}
          placeholder="Nhập lại mật khẩu..."
          style={[styles.input, styles.passwordInput]}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setSecureTextEntryConfirm(!secureTextEntryConfirm)}
        >
          <Icon
            name={secureTextEntryConfirm ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

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
    backgroundColor: 'white',
  },

  h1: {
    fontSize: 25,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    margin: 20,
    width: '100%',
    backgroundColor: '#F0FFF0',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#F0FFF0',
  },

  passwordInput: {
    flex: 1,
    height:30,
  },

  iconContainer: {
    padding: 10,
  },

  button: {
    marginTop: 20,
    width: '50%',
    backgroundColor: 'green',
  },
});

export default Register;
