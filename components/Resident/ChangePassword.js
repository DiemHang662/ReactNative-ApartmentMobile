import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground} from 'react-native';
import { authApi } from '../../configs/API'; 
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation(); 

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const api = await authApi(); 
      const response = await api.post('/api/residents/change-password/', {
        old_password: oldPassword,
        new_password: newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Thông báo', 'Đã thay đổi mật khẩu thành công.');
        navigation.navigate('Profile')
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Thông báo', 'Đã xảy ra lỗi');
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi mật khẩu:', error);
      Alert.alert('Thông báo', 'Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau.');
    }
  };

  return (
    <ImageBackground
    source={{ uri: 'https://xaydungnhatrongoi.vn/wp-content/uploads/2023/09/1-9.jpg' }} // Replace with your image URL
    style={styles.background} >
    <View style={styles.container}>
      <Text style={styles.label}>Mật khẩu cũ:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu cũ..."
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
      />
      <Text style={styles.label}>Mật khẩu mới:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu mới..."
        secureTextEntry={true}
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu mới..."
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Thay đổi</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({   
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container:{
    position:'absolute',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    width: '90%',
    marginTop: '38%',
    marginBottom: '38%',
    borderRadius: 10,
    opacity: 0.95,
  },

  label: {
    fontSize: 18,
    marginBottom: 20,
    marginLeft:20,
    fontWeight:'bold',
  },

  input: {
    marginBottom: 20,
    backgroundColor: '#F0FFF0',
    width: '99%',
    height:60,
    paddingHorizontal:30,
    borderColor:'lightgray',
    borderWidth:1,
    borderRadius:50,
    fontSize:18,
    fontStyle:'italic',
  },

  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft:110,
    width:'35%',
    marginTop:30,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold',
  },
});

export default ChangePasswordScreen;
