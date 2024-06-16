import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.6:8000/';

export const endpoints = {
  residents: '/api/residents/',
  'create-new-account': '/api/residents/create-new-account/',
  'current-user': '/api/residents/current-user/',
  bills: '/api/bills/',
  'create-bill': '/api/bills/create-bill/',
  updateStatus: (id) => `/api/bills/${id}/`,
  login: '/o/token/',
  flats: '/api/flats/',
  items: '/api/items/my-items/',
  feedback: '/api/feedback/',
  updateResolved: (id) => `/api/feedback/${id}/mark_as_resolved/`,
  famembers: '/api/famembers/',
  survey: '/api/survey/',
  surveyID: (id) => `/api/survey/${id}/`, 
  surveyresult: '/api/surveyresult/',
  surveyresultID: (id) => `/api/surveyresult/${id}/`,
  payment: '/api/payment/',
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
