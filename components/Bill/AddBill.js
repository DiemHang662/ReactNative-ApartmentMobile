import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Text, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { authApi, endpoints } from '../../configs/API';

const AddBill = ({ navigation }) => {
  const [resident, setResident] = useState('');
  const [billType, setBillType] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const api = await authApi();
        const response = await api.get('/api/residents/current-user/');
        const userDetails = response.data;
        setUser(userDetails);
        if (!userDetails.is_superuser) {
          Alert.alert("Xin lỗi", "Cư dân không được cấp quyền thực hiện");
          navigation.goBack();
        }
      } catch (error) {
        console.error('Lỗi lấy thông tin user:', error);
      }
    };
    fetchUserDetails();
  }, [navigation]);

  const onChangeIssueDate = (event, selectedDate) => {
    const currentDate = selectedDate || issueDate;
    setShowDatePicker(false); 
    setIssueDate(currentDate);
  };

  const onChangeDueDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false); 
    setDueDate(currentDate);
  };

  const showIssueDatePicker = () => {
    setShowDatePicker(true);
  };

  const showDueDatePicker = () => {
    setShowDatePicker(true);
  };

  const submitBill = async () => {
    try {
      const api = await authApi();
      const response = await api.post('/api/bills/create-bill/', {
        resident_id: resident, 
        bill_type: billType,
        issue_date: issueDate.toISOString().split('T')[0], 
        due_date: dueDate.toISOString().split('T')[0],     
        amount: parseFloat(amount), 
      });
      console.log('Đã thêm thành công:', response.data);
    
      setResident('');
      setBillType('');
      setIssueDate(new Date());
      setDueDate(new Date());
      setAmount('');
    } catch (error) {
      console.error('Lỗi thêm hóa đơn:', error.response ? error.response.data : error.message);
      setError('Thêm hóa đơn thất bại. Hãy thử lại!.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Card>
          <Card.Title style={styles.h2}>THÔNG TIN HÓA ĐƠN</Card.Title>
          <Card.Divider />
          <TextInput
            style={styles.input}
            placeholder="Nhập mã cư dân..."
            value={resident}
            onChangeText={text => setResident(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Loại hóa đơn..."
            value={billType}
            onChangeText={text => setBillType(text)}
          />
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Ngày phát hành:</Text>
            <Text onPress={showIssueDatePicker}>{issueDate.toDateString()}</Text>
            {showDatePicker && (
              <DateTimePicker value={issueDate} mode="date"
                display="default" onChange={onChangeIssueDate}
              />
            )}
          </View>
          <View style={styles.datePicker}>
            <Text style={styles.dateLabel}>Ngày hết hạn:</Text>
            <Text onPress={showDueDatePicker}>{dueDate.toDateString()}</Text>
            {showDatePicker && (
              <DateTimePicker value={dueDate} mode="date"
                display="default" onChange={onChangeDueDate}
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Số tiền phải trả..."
            value={amount}
            onChangeText={text => setAmount(text)}
          />
          <Button title="Thêm Hóa Đơn" onPress={submitBill} color={'green'} />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    backgroundColor: 'white',
    padding: 10,
    height: '100%',
  },

  h2: {
    fontSize: 25,
    color:'green',
  },

  input: {
    height: 45,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginVertical: 15,
    padding: 10,
    borderRadius: 5,
  },

  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
  },

  dateLabel: {
    fontSize: 15,
    marginRight: 10,
    color:'gray',
  },

  errorText: {
    color: 'red',
    marginTop: 15,
  },
});

export default AddBill;
