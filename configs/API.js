import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://diemhang.pythonanywhere.com/';

export const endpoints = {
  residents: '/api/residents/',
  'current-user': '/api/residents/current-user/',
  bills: '/api/bills/',
  login: '/o/token/',
  flats: '/api/flats/',
  items: '/api/items/',
  feedback: '/api/feedback/',
  famembers: '/api/famembers/',
  survey: '/api/survey/',
  surveyresult: '/api/surveyresult/',
};

export const setAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('access_token', token);
    console.log('Token set successfully:', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      throw new Error('No token found');
    }
    console.log('Token retrieved successfully:', token);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw error;
  }
};

export const authApi = async () => {
  try {
    const token = await getAuthToken();
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error creating auth API instance:', error);
    throw error;
  }
};

export default axios.create({
  baseURL: BASE_URL,
});
