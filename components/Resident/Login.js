import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import API, { setAuthToken, endpoints } from "../../configs/API";
import { MyDispatchContext } from "../../configs/Contexts";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
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
    <ImageBackground
      source={{ uri: 'https://xaydungnhatrongoi.vn/wp-content/uploads/2023/09/1-9.jpg' }} // Replace with your image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.h1}>ĐĂNG NHẬP</Text>
        <TextInput
          value={username}
          onChangeText={t => setUsername(t)}
          placeholder="Tên đăng nhập..."
          style={styles.input}
        />
        <View style={styles.password}>
          <TextInput
            value={password}
            onChangeText={t => setPassword(t)}
            secureTextEntry={secureTextEntry}
            placeholder="Mật khẩu..."
            style={[styles.input, styles.passwordInput]}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Icon
              name={secureTextEntry ? 'visibility-off' : 'visibility'}
              size={22}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={login} style={styles.button}>
          Đăng nhập
        </Button>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    position:'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    width: '85%',
    marginTop: '35%',
    marginBottom: '35%',
    borderRadius: 10,
    opacity: 0.95,
  },

  h1: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 30,
  },

  input: {
    marginBottom: 8,
    backgroundColor: '#F0FFF0',
    width: '98%',
  },

  password: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height:45,
    margin: 40,
  },

  passwordInput: {
    flex: 1,
    height:50,
  },

  button: {
    width: '50%',
    backgroundColor: 'green',
    marginTop: 30,
  },

});

export default Login;
