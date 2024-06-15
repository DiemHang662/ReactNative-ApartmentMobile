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
      const api = await authApi();  // Obtain authenticated API instance
      const response = await api.patch(endpoints.updateStatus(bill.id), {
        payment_status: 'PAID',
      });

      // Check if request was successful
      if (response.status === 200 || response.status === 204) {  // Adjust status codes as per your API response
        alert('Thanh toán thành công');
        // Optionally update UI state or navigate to another screen
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
          <Text style={styles.text}>
            <Text style={styles.text1}>Họ và tên:     </Text>
            <Text style={styles.text2}>{bill.first_name} {bill.last_name}</Text>
          </Text>
          
          <Text style={styles.text}>
            <Text style={styles.text1}>Số tài khoản:     </Text>
            <Text style={styles.text2}>{bill.phone}</Text>
          </Text>

          <Text style={styles.text}>
            <Text style={styles.text1}>Ngày phát hành:     </Text>
            <Text style={styles.text2}>{bill.issue_date}  </Text>
          </Text>

          <Text style={styles.text}>
            <Text style={styles.text1}>Ngày hết hạn:     </Text>
            <Text style={styles.text2}>{bill.due_date}  </Text>
          </Text>

          <Text style={styles.text}>
            <Text style={styles.text1}>Số tiền:     </Text>
            <Text style={styles.text2}>{bill.amount}  đồng</Text>
          </Text>

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
    margin:25,
    height:'90%',
    padding:20,
  },

  scrollContainer:{
    backgroundColor:'#D82D8B',
    width:'100%',
    height:'100%',
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
    height:'80%',
  },

  text:{
    margin:10,
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

  payment: {
    marginTop: 75,
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