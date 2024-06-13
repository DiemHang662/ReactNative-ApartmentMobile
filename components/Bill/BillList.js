import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { authApi, endpoints } from '../../configs/API';


const BillList = () => {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const api = await authApi(); 
        const params = filter === 'all' ? {} : { payment_status: filter.toUpperCase() };
        const response = await api.get(endpoints.bills, { params });
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error.response?.data || error.message);
      }
    };

    fetchBills();
  }, [filter]);

  const handleSelectBill = (selectedBill) => {
    navigation.navigate('BillDetail', { bill: selectedBill });
  };

  const filteredBills = bills.filter(bill =>
    bill.bill_type.toLowerCase().includes(searchTerm.toLowerCase())
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
          onPress={() => setFilter('paid')}
          style={filter === 'paid' ? styles.activeButton : styles.inactiveButton}
        >
          Đã thanh toán
        </Button>
        <Button
          mode="contained"
          onPress={() => setFilter('unpaid')}
          style={filter === 'unpaid' ? styles.activeButton : styles.inactiveButton}
        >
          Chưa thanh toán
        </Button>
      </View>
      <FlatList
        data={filteredBills}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            onPress={() => handleSelectBill(item)}
            bottomDivider
            containerStyle={styles.listItemContainer}
          >
            <ListItem.Content>
              <ListItem.Title>{item.bill_type}</ListItem.Title>
              <ListItem.Subtitle>{item.issue_date}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        keyExtractor={item => item.id.toString()}
      />
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
  listItemContainer: {
    marginVertical: 8,
    padding: 20,
  },
});

export default BillList;
