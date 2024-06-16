import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';

const FamemberDetail = ({ route }) => {
  const { fmb } = route.params;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title style={styles.h2}>THÔNG TIN ĐĂNG KÝ XE</Card.Title>
        <Card.Divider />

        <Text style={styles.content}>
          <Text style={styles.text}>Mã cư dân:    </Text>
          <Text>{fmb.resident} </Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Họ và tên:    </Text>
          <Text>{fmb.first_name} {fmb.last_name} </Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Họ và tên người thân:  </Text>
          <Text >{fmb.name}</Text>
        </Text>

        <Text style={styles.content}>
          <Text style={styles.text}>Biển số xe:   </Text>
          <Text >{fmb.numberXe}</Text>
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
  h2: {
    fontSize: 20,
    color:'green',
  },
  content: {
    fontSize: 18,
    margin: 10,
    padding: 5,
  },
  text: {
    color: 'green',
    fontWeight: 'bold',
  },

});

export default FamemberDetail;
