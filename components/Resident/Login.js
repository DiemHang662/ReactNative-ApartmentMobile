import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import API, { setAuthToken, endpoints } from "../../configs/API"; 
import { MyDispatchContext } from "../../configs/Contexts";

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useContext(MyDispatchContext);
  
  const login = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('client_id', "JmpXlpBUFBPj6KMJx12fEouPDz73qricJnI4Vj9l");
      formData.append('client_secret', "k0kCAJ1hp9SFA3WLl2y0FzSSRcmuFo6gxSS3udqfxrSOE9FSGAbltvfvB87o9hkjggSAGYv9letZwxQhUfsppt9cfyVRwH8fdLFgehQjpjit1wI2WzotC69NNo9FRlys");
      formData.append('grant_type', "password");

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      };

      const res = await API.post(endpoints['login'], formData, config);

      const token = res.data.access_token;
      console.log('Login successful, token:', token);
      await setAuthToken(token);

      setTimeout(async () => {
        let user = await API.get(endpoints['current-user'], {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.info(user.data);

        dispatch({
            type: "login",
            payload: user.data
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'Trang chủ' }],
        });
        
      }, 100);
    } catch (ex) {
      console.error('Login error', ex);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>ĐĂNG NHẬP</Text>
      <TextInput 
        value={username} 
        onChangeText={t => setUsername(t)} 
        placeholder="Tên đăng nhập..."
        style={styles.input}
      />
      <TextInput 
        value={password} 
        onChangeText={t => setPassword(t)} 
        secureTextEntry={true} 
        placeholder="Mật khẩu..."
        style={styles.input}
      />
      <Button mode="contained" onPress={login} style={styles.button}>
        Đăng nhập
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  h1: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
    margin: 30,
  },
  input: {
    marginBottom: 30,
    backgroundColor: '#F0FFF0',
    width: '97%',
  },
  button: {
    width: '50%',
    backgroundColor: 'green',
  },
});

export default Login;
