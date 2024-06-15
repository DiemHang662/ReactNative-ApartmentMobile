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
        <Text style={styles.content}>
          <Text style={styles.text}>Mã hóa đơn:   </Text>
          <Text>{bill.id}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Cư dân:    </Text>
          <Text>{bill.first_name} {bill.last_name}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Loại hóa đơn:   </Text>
          <Text>{bill.bill_type}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Ngày phát hành:   </Text>
          <Text>{bill.issue_date}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Ngày hết hạn:   </Text>
          <Text>{bill.due_date}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Số tiền thanh toán:   </Text>
          <Text>{bill.amount} đồng</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Tình trạng thanh toán:   </Text>
          <Text> {bill.payment_status}</Text>
        </Text>
        
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

  text:{
    color:'green',
    fontWeight:'bold',
  },
});

export default BillDetail;
