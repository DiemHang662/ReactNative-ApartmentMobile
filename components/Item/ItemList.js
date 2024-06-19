import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { authApi, endpoints } from '../../configs/API';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [pendingCount, setPendingCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const api = await authApi();
        const params = filter === 'all' ? {} : { status: filter };
        const response = await api.get(endpoints.items, { params });
        setItems(response.data);

        // Calculate the number of pending items
        const pendingItems = response.data.filter(item => item.status === 'PENDING').length;
        setPendingCount(pendingItems);

        // Show alert if there are pending items
        if (pendingItems > 0) {
          Alert.alert(`Bạn có ${pendingItems} món hàng đang chờ nhận`);
        }
      } catch (error) {
        console.error('Error fetching items:', error.response?.data || error.message);
      }
    };

    fetchItems();
  }, [filter]);

  const handleSelectItem = (selectedItem) => {
    navigation.navigate('ItemDetail', { item: selectedItem });
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          onPress={() => setFilter('PENDING')}
          style={filter === 'PENDING' ? styles.activeButton : styles.inactiveButton}
        >
          Chờ nhận
        </Button>
        <Button
          mode="contained"
          onPress={() => setFilter('RECEIVED')}
          style={filter === 'RECEIVED' ? styles.activeButton : styles.inactiveButton}
        >
          Đã nhận
        </Button>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            onPress={() => handleSelectItem(item)}
            bottomDivider
            containerStyle={styles.listItemContainer}
          >
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button
        mode="contained"
        onPress={(AddItem) => navigation.navigate('AddItem')}
        style={styles.addButton}
      >
        Thêm món hàng
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
    backgroundColor: 'green',
  },
  listItemContainer: {
    marginVertical: 8,
    padding: 20,
  },
});

export default ItemList;
