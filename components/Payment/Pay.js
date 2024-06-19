import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { authApi, endpoints } from '../../configs/API';

const Pay = ({ route }) => {
  const { bill, onPaymentSuccess } = route.params;
  const navigation = useNavigation();

  const payment = async () => {
    try {
      const api = await authApi();
      const response = await api.patch(endpoints.updateStatus(bill.id), {
        payment_status: 'PAID',
      });

      if (response.status === 200 || response.status === 204) {
        alert('Thanh toán thành công');
        onPaymentSuccess(); 
        navigation.goBack(); 
      } else {
        console.error('Unexpected status code:', response.status);
        alert('Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Có lỗi xảy ra');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.h1}>THÔNG TIN TÀI KHOẢN</Text>
        <View style={styles.momo}>
          <Text style={styles.textReceive}>
            <Text style={styles.text1}>Số tài khoản:  </Text>
            <Text style={styles.text2}>   0346661367</Text>
          </Text>
          <Text style={styles.textReceive}>
            <Text style={styles.text1}>Người nhận:  </Text>
            <Text style={styles.text2}>   Đỗ Quỳnh Như</Text>
          </Text>
          <Text style={styles.textReceive}>
            <Text style={styles.text1}>Số tài khoản:   </Text>
            <Text style={styles.text2}> {bill.phone}</Text>
          </Text>
          <Text style={styles.textSend}>
            <Text style={styles.text1}>Người gửi:  </Text>
            <Text style={styles.text2}>   {bill.first_name} {bill.last_name}</Text>
          </Text>
          <Text style={styles.textReceive}>
            <Text style={styles.text1}>Số tiền:  </Text>
            <Text style={styles.text2}>   {bill.amount}đ</Text>
          </Text>
          <View style={styles.payment}>
            <Button title="Xác nhận thanh toán" onPress={payment} color={'#CC0000'} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
    height: '95%',
    padding: 20,
  },
  scrollContainer: {
    backgroundColor: 'green',
    flexGrow: 1,
  },
  h1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#CC0000',
    padding: 15,
    marginBottom: 20,
  },
  momo: {
    borderWidth: 1,
    borderColor: '#B9B9B9',
    borderRadius: 7,
    padding: 15,
    height: '85%',
  },
  textReceive: {
    margin: 10,
  },
  textSend: {
    marginTop: 20,
    padding: 7,
  },
  text1: {
    fontSize: 19,
    margin: 10,
    paddingBottom: 15,
  },
  text2: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    paddingBottom: 5,
  },
  payment: {
    marginTop: 50,
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default Pay;
