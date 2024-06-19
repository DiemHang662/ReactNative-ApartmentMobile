import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from "react-native-paper";
import { Card } from 'react-native-elements';
import { MyDispatchContext } from '../../configs/Contexts';
import { authApi, endpoints } from '../../configs/API';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect if using @react-navigation/native
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useContext(MyDispatchContext);

  const fetchProfile = useCallback(async () => {
    try {
      const api = await authApi();
      const response = await api.get(endpoints.residents);
      console.log('API response:', response.data); // Log the response data for debugging
      setResident(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile(); // Reload lại Profile sau khi đổi ảnh đại diện
    }, [fetchProfile])
  );

  const handleLogout = () => {
    dispatch({ type: "logout" });
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleChangeAvatar = async () => {
    navigation.navigate('ChangeAvatar');
    await fetchProfile();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#009900" />;
  }

  if (!resident || !Array.isArray(resident) || resident.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Không thể tải thông tin cư dân.</Text>
      </View>
    );
  }

  const user = resident[0];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.h1}>Chào, {user.first_name} {user.last_name}</Text>
          {user.avatar_url && (
            <Image
              source={{ uri: user.avatar_url }}
              style={{ width: 200, height: 200, borderRadius: 180 }}
            />
          )}
            <TouchableOpacity onPress={handleChangeAvatar} style={styles.iconButton}>
            <Text style={styles.textAvatar}><MaterialCommunityIcons name="image-plus" size={25} color="gray" />  Đổi ảnh</Text>
          </TouchableOpacity>
        </View>
        <Card>
          <Card.Title style={styles.h2}>HỒ SƠ CÁ NHÂN </Card.Title>
          <Card.Divider />
          <Text style={styles.content}>
            <Text style={styles.text}>Họ và tên: </Text>
            <Text>  {user.first_name} {user.last_name}</Text>
          </Text>

          <Text style={styles.content}>
            <Text style={styles.text}>Tên tài khoản: </Text>
            <Text>  {user.username}</Text>
          </Text>

          <Text style={styles.content}>
            <Text style={styles.text}>Số điện thoại: </Text>
            <Text>  {user.phone}</Text>
          </Text>

          <Text style={styles.content}>
            <Text style={styles.text}>Email: </Text>
            <Text>  {user.email}</Text>
          </Text>

        </Card>
        <Button style={styles.btlogout} labelStyle={{ color: 'white' }} icon="logout" onPress={handleLogout}>ĐĂNG XUẤT</Button>

        <TouchableOpacity style={styles.changePassword} onPress={handleChangePassword}>
          <Text style={styles.textPassword}> Đổi mật khẩu ?</Text>
        </TouchableOpacity>

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
    backgroundColor: 'white',
    padding: 10,
    height: '100%',
  },

  h1: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: "red",
    marginBottom: 20,
    textTransform: 'uppercase',
  },

  h2: {
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 7,
    margin: 7,
  },

  content: {
    fontSize: 19,
    margin: 10,
    padding: 5,
  },

  text: {
    color: 'green',
    fontWeight: 'bold',
  },

  error: {
    textAlign: 'center',
    color: 'red',
  },

  btlogout: {
    backgroundColor: '#CC0000',
    width: '40%',
    marginTop: 30,
    marginLeft: 120,
  },

  changePassword: {
    alignItems: 'center',
    marginTop: 25,
  },

  textPassword: {
    fontSize: 18,
    color: 'blue',
    fontWeight:'500',
    textDecorationLine: 'underline',
  },

  textAvatar:{
    fontSize:15,
  },

  iconButton:{
    marginTop:10,
    marginBottom:20,
  }
});

export default Profile;
