import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../../configs/API'; // Adjust this path based on your project structure

const Register = () => {
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [is_staff, setIsStaff] = useState(false);
  const [is_superuser, setIsSuperuser] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

  const handleChooseAvatar = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied!', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('is_staff', is_staff);
      formData.append('is_superuser', is_superuser);
      if (avatar) {
        formData.append('avatar', {
          uri: avatar.uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await API.post('http://192.168.1.6:8000/api/residents/create-new-account/', formData, config);
      console.log('Register successful:', res.data);
      Alert.alert('Success', 'Account created successfully');

    } catch (error) {
      console.error('Register error', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={{ uri: 'https://xaydungnhatrongoi.vn/wp-content/uploads/2023/09/1-9.jpg' }}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.h1}>ĐĂNG KÝ NGƯỜI DÙNG</Text>
          <TextInput
            label="Họ..."
            value={first_name}
            onChangeText={text => setFirstname(text)}
            style={styles.input}
          />
          <TextInput
            label="Tên..."
            value={last_name}
            onChangeText={text => setLastname(text)}
            style={styles.input}
          />
          <TextInput
            label="Tên tài khoản..."
            value={username}
            onChangeText={text => setUsername(text)}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            label="Email..."
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            style={styles.input}
          />
          <TouchableOpacity style={styles.input} onPress={handleChooseAvatar}>
            <Text style={styles.textAvatar}>Ảnh đại diện:</Text>
            {avatar === '' ? (
              <Icon name="upload" size={25} color="gray" marginLeft={165} />
            ) : (
              <Image source={{ uri: avatar.uri }} style={styles.avatarImage} />
            )}
          </TouchableOpacity>
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

        <View style={styles.isAdminOrUser}>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Cư dân
              <Checkbox color="green"
                status={is_staff ? 'checked' : 'unchecked'}
                onPress={() => setIsStaff(!is_staff)} 
              />
            </Text>
          </View>

          <View style={styles.checkboxContainer}>
            
            <Text style={styles.checkboxLabel}>Quản trị viên
              <Checkbox color="green"
                status={is_superuser ? 'checked' : 'unchecked'}
                onPress={() => setIsSuperuser(!is_superuser)}
              />
            </Text>
          </View>

        </View>
          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Đăng ký
          </Button>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
    width: '85%',
    marginTop: '15%',
    marginBottom: '15%',
    borderRadius: 10,
    opacity: 0.95,
  },

  h1: {
    fontSize: 25,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },

  input: {
    margin: 10,
    width: '100%',
    backgroundColor: '#F0FFF0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textAvatar: {
    fontSize: 16,
    margin: 10,
    padding: 10,
  },

  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#F0FFF0',
  },

  passwordInput: {
    flex: 1,
  },

  iconContainer: {
    padding: 10,
  },

  button: {
    marginTop: 40,
    marginBottom:20,
    width: '50%',
    backgroundColor: 'green',
  },

  isAdminOrUser:{
    flex: 1,
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F0FFF0',
    width:'100%',
  },

  checkboxContainer:{
    padding:10,
     marginRight:10,
     marginLeft:10,
  },

  checkboxLabel:{
    fontSize:16,
  },

});

export default Register;
