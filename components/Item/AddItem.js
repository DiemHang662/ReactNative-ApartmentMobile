import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert, Modal, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import { authApi } from '../../configs/API';

const AddItem = ({ navigation }) => {
  const [residentId, setResidentId] = useState('');
  const [first_name, setFirstname] = useState('1');
  const [last_name, setLastname] = useState('1');
  const [itemName, setItemName] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const submitItem = async () => {
    try {
      const api = await authApi();
      const response = await api.post('/api/items/create-item/', {
        resident: residentId, 
        first_name: first_name,  
        last_name: last_name,  
        name: itemName,
        status: status,
      });
      console.log('Đã thêm thành công:', response.data);
  
      setResidentId('');
      setFirstname('');
      setLastname('');
      setItemName('');
      setStatus('PENDING');
      Alert.alert("Thông báo", "Thêm món hàng thành công");
    } catch (error) {
      console.error('Lỗi thêm món hàng:', error.response ? error.response.data : error.message);
      setError('Thêm món hàng thất bại. Hãy thử lại!');
    }
  };
  

  const handleStatusChange = (value) => {
    setStatus(value);
    setModalVisible(false); 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Text style={styles.h1}>THÔNG TIN HÀNG ĐIỆN TỬ</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mã cư dân..."
            value={residentId}
            onChangeText={text => setResidentId(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên món hàng..."
            value={itemName}
            onChangeText={text => setItemName(text)}
          />
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Trạng thái:</Text>
            <TouchableHighlight
              style={styles.touchableHighlight}
              onPress={() => setModalVisible(true)}
              underlayColor="lightgray"
            >
              <Text>{status === 'PENDING' ? 'Pending' : 'Received'}</Text>
            </TouchableHighlight>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <ScrollView>
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleStatusChange('PENDING')}
                  >
                    <Text>Pending</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleStatusChange('RECEIVED')}
                  >
                    <Text>Received</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </Modal>
          </View>
          <TouchableOpacity style={styles.button} onPress={submitItem}>
            <Text style={styles.buttonText}>Thêm</Text>
          </TouchableOpacity>
          <Text style={styles.errorText}>{error}</Text>
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

  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height:'85%',
  },

  h1: {
    fontSize: 25,
    fontWeight:'bold',
    color: 'green',
    marginBottom: 20,
    marginTop:15,
    textAlign: 'center',
  },

  input: {
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop:20,
    marginBottom: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor:'white',
  },

  pickerContainer: {
    backgroundColor:'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 15,
    marginTop:15,
    borderRadius: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
  },

  touchableHighlight: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'gray',
  },

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'30%',
    marginTop:520,
    marginLeft:150,
  },

  option: {
    backgroundColor: '#F0FFF0',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: 'green',
    width: '100%',
    alignItems: 'center',
  },

  button: {
    marginTop: 30,
    height: 50,
    width:'30%',
    marginLeft:110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight:'bold',
  },

  errorText: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default AddItem;
