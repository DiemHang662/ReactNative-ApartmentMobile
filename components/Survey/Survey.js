import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Survey = () => {
  const navigation = useNavigation(); // Hook to access navigation object

  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [cleanlinessRating, setCleanlinessRating] = useState('');
  const [facilitiesRating, setFacilitiesRating] = useState('');
  const [servicesRating, setServicesRating] = useState('');
  const [error, setError] = useState(null);
  const [resident] = useState('1');

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const api = await authApi();
      const response = await api.get(endpoints.survey);
      setSurveys(response.data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      setError('Error fetching surveys. Please try again later.');
    }
  };

  const handleSurveySelection = (survey) => {
    setSelectedSurvey(survey);
  };


  const submitSurvey = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch("http://192.168.127.124:8000/api/surveyresult/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          survey: selectedSurvey.id,
          cleanliness_rating: cleanlinessRating,
          facilities_rating: facilitiesRating,
          services_rating: servicesRating,
          resident: resident,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.info(data);
      setCleanlinessRating('');
      setFacilitiesRating('');
      setServicesRating('');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setError(`Error submitting survey. ${error.message}`);
    }
  };

  const renderSurveyItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSurveySelection(item)} style={styles.surveyItem}>
      <Text style={[styles.h3, selectedSurvey === item && { color: '#1E90FF' }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Chọn khảo sát:</Text>

      <FlatList
        data={surveys}
        renderItem={renderSurveyItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />

      {selectedSurvey && (
        <View style={styles.surveyDetail}>
          <Text style={styles.h1}> {selectedSurvey.title}</Text>

          <Text style={styles.h4}>Nhập mức độ khảo sát cho tình hình vệ sinh</Text>
          <TextInput
            placeholder="Vệ sinh"
            value={cleanlinessRating}
            onChangeText={text => setCleanlinessRating(text)}
            style={styles.input}
          />

          <Text style={styles.h4}>Nhập mức độ khảo sát cho tình hình cơ sở vật chất</Text>
          <TextInput
            placeholder="Cơ sở vật chất"
            value={facilitiesRating}
            onChangeText={text => setFacilitiesRating(text)}
            style={styles.input}
          />

          <Text style={styles.h4}>Nhập mức độ khảo sát cho tình hình dịch vụ</Text>
          <TextInput
            placeholder="Dịch vụ"
            value={servicesRating}
            onChangeText={text => setServicesRating(text)}
            style={styles.input}
          />

          <Button title="Gửi khảo sát" onPress={submitSurvey} />
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  h2: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'green',
  },

  h3: {
    fontSize: 15,
  },

  surveyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },

  surveyDetail: {
    marginTop: 25,
  },

  h1: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'green',
    padding: 10,
  },

  h4: {
    fontStyle: 'italic',
    margin: 10,
    fontSize: 15,
  },

  input: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
  },

  errorText: {
    color: 'red',
    marginTop: 20,
  },
  
  iconButton: {
    alignItems: 'center',
    marginLeft:300,
  },
  
  text: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default Survey;
