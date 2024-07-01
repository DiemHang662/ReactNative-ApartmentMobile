import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Linking } from 'react-native';
import axios from 'axios';
import { authApi, endpoints } from '../../configs/API';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const Payment = () => {
    const [bills, setBills] = useState([]);
    const navigation = useNavigation();
    const [token, setToken] = useState('');

    useEffect(() => {
        fetchBills();
        fetchToken();
    }, []);

    const fetchBills = async () => {
        try {
            const api = await authApi();
            const response = await api.get(endpoints.payment);
            setBills(response.data);
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
    };

    const fetchToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('access_token');
            if (storedToken) {
                setToken(storedToken);
            } else {
                console.error('No token found');
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    const handleMomo = async (item) => {
        try {
            const api = await authApi();
            const partnerCode = "MOMO";
            const accessKey = "F8BBA842ECF85";
            const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
            const requestId = `${partnerCode}${Date.now()}`;
            const orderId = `MM${Date.now()}`;
            const orderInfo = "Thanh toán hóa đơn";
            const redirectUrl = "https://momo.vn/return";
            const ipnUrl = "https://callback.url/notify";
            const amount = item.amount; 
            const requestType = "payWithATM";
            const extraData = "";
    
            const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    
            const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);
    
            const requestBody = {
                partnerCode,
                accessKey,
                requestId,
                amount,
                orderId,
                orderInfo,
                redirectUrl,
                ipnUrl,
                extraData,
                requestType,
                signature,
                lang: "vi"
            };
    
            console.log('Request Body:', JSON.stringify(requestBody)); // Log the request body for debugging
    
            const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', JSON.stringify(requestBody), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Momo payment response:', response.data); // Log the entire response for detailed debugging
    
            if (response.data && response.data.payUrl) {
                const payUrl = response.data.payUrl.trim();
                console.log('Trimmed PayUrl:', payUrl); // Log trimmed payUrl for debugging
    
                Linking.openURL(payUrl)
                    .then(() => {
                        console.log('Successfully opened payUrl:', payUrl);
                    })
                    .catch((error) => {
                        console.error('Error opening payUrl:', error);
                        Alert.alert('Không thể mở thanh toán MOMO. Vui lòng thử lại sau!');
                    });
            } else {
                console.log('Error: Empty payUrl received');
                Alert.alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau!');
            }
        } catch (error) {
            console.error('Error during Momo payment request:', error.response?.data || error.message);
            Alert.alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau!');
        }
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={bills}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.billContainer}>
                        <Text style={styles.content}>
                            <Text style={styles.text}>Loại hóa đơn: </Text>
                            <Text style={styles.text1}>     {item.bill_type}</Text>
                        </Text>
                        <Text style={styles.content}>
                            <Text style={styles.text}>Số tiền thanh toán: </Text>
                            <Text style={styles.text1}>     {item.amount} VND</Text>
                        </Text>
                        <Text style={styles.content}>
                            <Text style={styles.text}>Ngày phát hành: </Text>
                            <Text style={styles.text1}>     {item.issue_date}</Text>
                        </Text>
                        <Text style={styles.content}>
                            <Text style={styles.text}>Ngày hết hạn: </Text>
                            <Text style={styles.text1}>     {item.due_date}</Text>
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Thanh toán qua MOMO" onPress={() => handleMomo(item)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    billContainer: {
        marginBottom: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 7,
      },

    content: {
        fontSize: 18,
    },
    text: {
        fontWeight: 'bold',
    },
    text1: {
        color: 'red',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default Payment;
