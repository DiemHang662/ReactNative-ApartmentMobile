import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Button } from "react-native-paper";
import { Text, Card } from 'react-native-elements';
import axios from 'axios';
import { MyDispatchContext } from '../../configs/Contexts';
import { authApi, endpoints } from '../../configs/API';

const Profile = ({ navigation }) => {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useContext(MyDispatchContext);

  useEffect(() => {
    const fetchProfile = async () => {
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
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    dispatch({ type: "logout" });
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
              style={{ width: 150, height: 150, borderRadius: 150 }}
            />
          )}
        </View>
        <Card>
          <Card.Title style={styles.h2}>HỒ SƠ CÁ NHÂN </Card.Title>
          <Card.Divider />
          <Text style={styles.content}>Họ và tên: {user.first_name} {user.last_name}</Text>
          <Text style={styles.content}>Tên tài khoản: {user.username}</Text>
          <Text style={styles.content}>Email: {user.email}</Text>
        </Card>
        <Button style={styles.btlogout} labelStyle={{ color: 'white' }} icon="logout" onPress={handleLogout}>ĐĂNG XUẤT</Button>
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
    color: "green",
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  h2: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 7,
    margin: 20,
  },
  content: {
    fontSize: 18,
    margin: 10,
    padding: 5,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  btlogout: {
    backgroundColor: '#CC0000',
    width: '50%',
    marginTop: 30,
    marginLeft: 80,
  },
});

export default Profile;
