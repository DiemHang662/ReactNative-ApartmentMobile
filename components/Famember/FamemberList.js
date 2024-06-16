import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { authApi, endpoints } from '../../configs/API'; // Assuming you have defined API endpoints

const FamemberList = () => {
  const [famembers, setFamembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchFamembers();
  }, []);

  const fetchFamembers = async () => {
    try {
      const api = await authApi(); // Assuming authApi() is defined in your API configuration
      const response = await api.get(endpoints.famembers);
      setFamembers(response.data);
    } catch (error) {
      console.error('Error fetching family members:', error.response?.data || error.message);
    }
  };

  const handleSelectFamember = (selectedFamember) => {
    navigation.navigate('FamemberDetail', { fmb: selectedFamember });
  };

  const filteredFamembers = famembers.filter(famember =>
    famember.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <FlatList
        data={filteredFamembers}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            onPress={() => handleSelectFamember(item)}
            bottomDivider
            containerStyle={styles.listItemContainer}
          >
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.numberXe}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Famember')}
        style={styles.addButton}
      >
        Đăng ký xe
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

  listItemContainer: {
    marginVertical: 8,
    padding: 20,
  },

  addButton: {
    backgroundColor: 'green',
    width: '90%',
    marginLeft: 20,
  },
});

export default FamemberList;
