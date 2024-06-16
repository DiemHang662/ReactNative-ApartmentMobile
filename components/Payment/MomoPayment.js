import React, { useState } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import { Text, TextInput } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { authApi, endpoints } from '../../configs/API';

const MomoPayment = ({ route }) => {
  const { bill } = route.params;

  const payment = async () => {
    try {
      const api = await authApi();  
      const response = await api.patch(endpoints.updateStatus(bill.id), {
        payment_status: 'PAID',
      });

      if (response.status === 200 || response.status === 204) {  // Adjust status codes as per your API response
        alert('Thanh toán thành công');
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
            <Text style={styles.text1}>Số tài khoản:     </Text>
            <Text style={styles.text2}>0346661367</Text>
          </Text>
          
          <Text style={styles.textReceive}>
            <Text style={styles.text1}>Người nhận:     </Text>
            <Text style={styles.text2}>Đỗ Quỳnh Như</Text>
          </Text>
          
          <Text style={styles.textReceive}>
            <Text style={styles.text1}>Số tài khoản:     </Text>
            <Text style={styles.text2}>{bill.phone}</Text>
          </Text>

          <Text style={styles.textSend}>
            <Text style={styles.text1}>Người gửi:     </Text>
            <Text style={styles.text2}>{bill.first_name} {bill.last_name}</Text>
          </Text>

          <Text style={styles.textReceive}>
            <Text style={styles.text1}>Số tiền:     </Text>
            <Text style={styles.text2}>{bill.amount}đ</Text>
          </Text>

          <Text style={styles.total}>Tổng số tiền ( đã bao gồm phí giao dịch )</Text>
          <Text style={styles.text3}>{bill.total_amount}đ</Text>
          

          <View style={styles.payment}>
            <Button title="Xác nhận thanh toán" onPress={payment} color={'#D82D8B'} />
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
    margin:20,
    height:'95%',
    padding:20,
  },

  scrollContainer:{
    backgroundColor:'#D82D8B',
    flexGrow:1,
  },

  h1:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:25,
    color:'#D82D8B',
    padding:15,
    marginBottom:20,
  },

  momo:{
    borderWidth:1,
    borderColor:'#B9B9B9',
    borderRadius:7,
    padding:15,
    height:'85%',
  },

  textReceive:{
    margin:10,
  },

  textSend:{
    marginTop:20,
    padding:7,
  },

  text1:{
    fontSize:19,
    margin:10,
    paddingBottom:15,
  },

  text2:{
    fontWeight:'bold',
    color:'black',
    fontSize:20,
    paddingBottom:5,

  },

  text3:{
    textAlign:'right',
    fontWeight:'bold',
    fontSize:22,
  },

  total:{
    marginTop:20,
    fontSize:20,
    padding:10,
  },

  payment: {
    marginTop: 50,
    width:'100%',
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default MomoPayment;