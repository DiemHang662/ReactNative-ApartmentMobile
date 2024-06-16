import React from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';

const FeedbackDetail = ({ route, navigation }) => {
  const { fb } = route.params;

  const handleToggleResolved = async () => {
    try {
      const api = await authApi();  
      const token = await AsyncStorage.getItem('access_token');
      const response = await api.patch(endpoints.updateResolved(fb.id),
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Phản ánh đã được giải quyết:', response.data);
      navigation.goBack(); 
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      Alert.alert("Xin lỗi", "Cư dân không được cấp quyền thực hiện");
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title style={styles.h2}>THÔNG TIN PHẢN ÁNH</Card.Title>
        <Card.Divider />

        <Text style={styles.content}>
          <Text style={styles.text}>Cư dân phản ánh: </Text>
          <Text>{fb.first_name} {fb.last_name}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Chủ đề: </Text>
          <Text>{fb.title}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Nội dung phản ánh: </Text>
          <Text>{fb.content}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Ngày viết: </Text>
          <Text>{fb.created_date}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Tình trạng: </Text>
          <Text>{fb.resolved ? 'Đã giải quyết' : 'Chưa giải quyết'}</Text>
        </Text>

        {!fb.resolved && (
          <Button
            title="Đánh dấu đã giải quyết"
            onPress={handleToggleResolved}
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
    color:'green',
  },
  content: {
    fontSize: 18,
    marginVertical: 5,
    marginTop:10,
    marginBottom:20,
  },
  text: {
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginLeft:45,
    marginBottom:10,
    backgroundColor: 'green',
    borderRadius:20,
    width:'70%',
  },
});

export default FeedbackDetail;
