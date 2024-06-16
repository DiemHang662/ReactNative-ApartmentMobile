import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { authApi, endpoints } from '../../configs/API';

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const api = await authApi();
        const params = filter === 'all' ? {} : { resolved: filter === 'resolved' ? 'true' : 'false' };
        const response = await api.get(endpoints.feedback, { params });
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error.response?.data || error.message);
      }
    };

    fetchFeedback();
  }, [filter]);

  const handleSelectFeedback = (selectedFeedback) => {
    navigation.navigate('FeedbackDetail', { fb: selectedFeedback });
  };

  const filteredFeedback = feedback.filter(fb =>
    fb.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search..."
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => setFilter('all')}
          style={filter === 'all' ? styles.activeButton : styles.inactiveButton}
        >
          Tất cả
        </Button>
        <Button
          mode="contained"
          onPress={() => setFilter('resolved')}
          style={filter === 'resolved' ? styles.activeButton : styles.inactiveButton}
        >
          Đã giải quyết
        </Button>
        <Button
          mode="contained"
          onPress={() => setFilter('unresolved')}
          style={filter === 'unresolved' ? styles.activeButton : styles.inactiveButton}
        >
          Chưa giải quyết
        </Button>
      </View>
      <FlatList
        data={filteredFeedback}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            onPress={() => handleSelectFeedback(item)}
            bottomDivider
            containerStyle={styles.listItemContainer}
          >
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.created_date}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        keyExtractor={item => item.id.toString()}
      />

    <Button
        mode="contained"
        onPress={() => navigation.navigate('Feedback')}
        style={styles.addButton}
      >
        Thêm Phản Hồi
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
  },

  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    width: '100%',
  },

  searchBarInput: {
    backgroundColor: '#F0FFF0',
    borderRadius: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },

  activeButton: {
    backgroundColor: 'green',
  },

  inactiveButton: {
    backgroundColor: 'lightgray',
  },

  addButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor:'green',
  },

  listItemContainer: {
    marginVertical: 8,
    padding: 20,
  },
});

export default FeedbackList;
