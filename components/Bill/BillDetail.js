import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';

const BillDetail = ({ route }) => {
  const { bill } = route.params;

  return (
    <View style={styles.container}>
        
      <Card>
        <Card.Title style={styles.h2}>THÔNG TIN HÓA ĐƠN</Card.Title>
        <Card.Divider />
        <Text style={styles.content}>Mã hóa đơn: {bill.id}</Text>
        <Text style={styles.content}>Mã cư dân: {bill.resident}</Text>
        <Text style={styles.content}>Loại hóa đơn: {bill.bill_type}</Text>
        <Text style={styles.content}>Ngày phát hành: {bill.issue_date}</Text>
        <Text style={styles.content}>Ngày hết hạn: {bill.due_date}</Text>
        <Text style={styles.content}>Số tiền thanh toán: {bill.amount} đồng</Text>
        <Text style={styles.content}>Tình trạng thanh toán: {bill.payment_status}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    height: '100%',
  },

  h2:{
    fontSize:20,
  },

  content: {
    fontSize: 18,
    margin: 10,
    padding:5,
  },
});

export default BillDetail;
