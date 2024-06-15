import 'react-native-gesture-handler';
import React, { useReducer } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './components/Home/Home';
import Profile from './components/Resident/Profile';
import Register from './components/Resident/Register';
import Login from './components/Resident/Login'; 
import BillList from './components/Bill/BillList'; 
import BillDetail from './components/Bill/BillDetail'; 
import Payment from './components/Payment/Payment';
import MomoPayment from './components/Payment/MomoPayment';
import Item from './components/Item/Item';
import Feedback from './components/Feedback/Feedback';
import Survey from './components/Survey/Survey';
import Famember from './components/Famember/Famember'; 
import { MyDispatchContext, MyUserContext } from './configs/Contexts';
import MyUserReducer from './configs/MyUserReducer';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BillStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 30, 
          fontWeight: 'bold',
          color:'green',
        },
      }} >

      <Stack.Screen name="BillList" component={BillList} options={{ title: 'DANH SÁCH HÓA ĐƠN' }} />
      <Stack.Screen name="BillDetail"component={BillDetail} options={{ title: 'CHI TIẾT HÓA ĐƠN' }} />
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18, 
          fontWeight: 'bold',
          color:'#D82D8B',
        },
      }} >
      <Stack.Screen name="Payment" component={Payment} options={{ title: 'DANH SÁCH HÓA ĐƠN CHƯA THANH TOÁN' }} />
      <Stack.Screen name="MomoPayment"component={MomoPayment} options={{ title: 'THANH TOÁN BẰNG VÍ MOMO' }} />
    </Stack.Navigator>
  );
}


function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Trang Chủ' component={Home}
        options={{
          drawerActiveTintColor: 'green', 
        }}
       />

      <Drawer.Screen name='Hóa đơn' component={BillStack} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
       />

    <Drawer.Screen name='Thanh toán' component={PaymentStack} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
     />

      <Drawer.Screen name='Tủ đồ điện' component={Item} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
     />

      <Drawer.Screen name='Khảo sát' component={Survey} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
      />

      <Drawer.Screen name='Phản ánh' component={Feedback} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
     />

     <Drawer.Screen name='Đăng ký xe' component={Famember} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
     />

    </Drawer.Navigator>
  );
}

function App() {
  const [resident, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyUserContext.Provider value={resident}>
      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{
              tabBarActiveTintColor: 'green', 
              tabBarInactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Trang chủ" component={DrawerNavigator} options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }} />
           
            {resident === null ? (
              <>
                <Tab.Screen name="Đăng ký" component={Register} options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-plus-outline" color={color} size={size} />
                  ),
                }} />

                <Tab.Screen name="Đăng nhập" component={Login} options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="login" color={color} size={size} />
                  ),
                }} />
              </>
            ) : (
              <Tab.Screen name="Hồ sơ" component={Profile} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }} />
            )}

          </Tab.Navigator>
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;
