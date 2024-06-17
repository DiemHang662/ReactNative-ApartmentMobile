import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import { authApi, endpoints } from '../../configs/API';  
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemDetail = ({ route, navigation }) => {
  const { item } = route.params;

  const handleReceived= async () => {
    try {
      const api = await authApi();  
      const token = await AsyncStorage.getItem('access_token');
      const response = await api.patch(endpoints.updateReceived(item.id),
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Cư dân đã nhận hàng:', response.data);
      navigation.goBack(); 
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      Alert.alert("Xin lỗi", "Cư dân không được cấp quyền thực hiện");
    }
  };
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title style={styles.h2}>THÔNG TIN MÓN HÀNG</Card.Title>
        <Card.Divider />

        <Text style={styles.content}>
          <Text style={styles.text}>Cư dân:    </Text>
          <Text>{item.first_name} {item.last_name}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Tên hàng:    </Text>
          <Text>{item.name}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Tình trạng:  </Text>
          <Text>{item.status === 'PENDING' ? 'Chờ nhận' : 'Đã nhận'}</Text>
        </Text>

        {item.status === 'PENDING' && (
          <Button
            title="Xác nhận đã nhận hàng"
            onPress={handleReceived}
            buttonStyle={styles.button}
          />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  h2: {
    fontSize: 20,
    marginBottom: 10,
    color: 'green',
  },
  content: {
    fontSize: 18,
    marginVertical: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginLeft: 45,
    marginBottom: 10,
    backgroundColor: 'green',
    borderRadius: 20,
    width: '70%',
  },
});

export default ItemDetail;
