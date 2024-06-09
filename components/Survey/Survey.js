import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';

const Survey = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveyResults, setSurveyResults] = useState([]);
  const [cleanlinessRating, setCleanlinessRating] = useState('');
  const [facilitiesRating, setFacilitiesRating] = useState('');
  const [servicesRating, setServicesRating] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const api = await authApi();
      const response = await api.get(endpoints.survey);
      setSurveys(response.data);
    }
     catch (error) {
      console.error('Error fetching surveys:', error);
      setError('Error fetching surveys. Please try again later.');
    }
  };
  
  const fetchSurveyResults = async (surveyId) => {
    try {
      const api = await authApi();
      const response = await api.get(`endpoints/surveyresult=${surveyId}`);
      setSurveyResults(response.data);
    } catch (error) {
      console.error('Error fetching survey results:', error);
      setError('Error fetching survey results. Please try again later.');
    }
  }; 

  const handleSurveySelection = (survey) => {
    setSelectedSurvey(survey);
    fetchSurveyResults(survey.id);
  };

  const submitSurvey = async () => {
    try {
      const api = authApi();
      const response = await api.post(endpoints.surveyresult, {
        survey: selectedSurvey.id,
        survey: selectedSurvey.id,
        cleanliness_rating: cleanlinessRating,
        facilities_rating: facilitiesRating,
        services_rating: servicesRating,
        resident: 3, 
      });
      if (response.ok) {
        alert('Survey submitted successfully!');
        setCleanlinessRating('');
        setFacilitiesRating('');
        setServicesRating('');
      } else {
        throw new Error('Failed to submit survey');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setError(`Error submitting survey. ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Chọn khảo sát:</Text>
      <View style={styles.list}>
        {surveys.map(survey => (
          <TouchableOpacity key={survey.id} onPress={() => handleSurveySelection(survey)} style={styles.surveyItem}>
            <Text style={[styles.h3, selectedSurvey === survey && { color: '#1E90FF' }]}>{survey.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedSurvey && (
        <View style={styles.surveyDetail}>
          <Text style={styles.h1}> {selectedSurvey.title}</Text>

          <Text style={styles.h4}>Nhập mức độ khảo sát cho tình hình vệ sinh</Text>
          <TextInput
            placeholder="Vệ sinh" value={cleanlinessRating}
            onChangeText={text => setCleanlinessRating(text)} style={styles.input} />

          <Text style={styles.h4}>Nhập mức độ khảo sát cho tình hình cơ sở vật chất</Text>
          <TextInput placeholder="Cơ sở vật chất" value={facilitiesRating}
            onChangeText={text => setFacilitiesRating(text)} style={styles.input} />

          <Text style={styles.h4}>Nhập mức độ khảo sát cho tình hình dịch vụ</Text>
          <TextInput placeholder="Dịch vụ" value={servicesRating}
            onChangeText={text => setServicesRating(text)} style={styles.input} />

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

  list: {
    marginVertical: 20,
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

  resultItem: {
    marginBottom: 10,
  },
});

export default Survey;
