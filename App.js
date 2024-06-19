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
import ChangePassword from './components/Resident/ChangePassword';
import ChangeAvatar from './components/Resident/ChangeAvatar';
import Login from './components/Resident/Login'; 
import BillList from './components/Bill/BillList'; 
import BillDetail from './components/Bill/BillDetail'; 
import AddBill from './components/Bill/AddBill'; 
import Payment from './components/Payment/Payment';
import Pay from './components/Payment/Pay';
import AddItem from './components/Item/AddItem';
import ItemList from './components/Item/ItemList';
import ItemDetail from './components/Item/ItemDetail';
import Feedback from './components/Feedback/Feedback';
import FeedbackList from './components/Feedback/FeedbackList';
import FeedbackDetail from './components/Feedback/FeedbackDetail';
import Survey from './components/Survey/Survey';
import Famember from './components/Famember/Famember'; 
import FamemberList from './components/Famember/FamemberList'; 
import FamemberDetail from './components/Famember/FamemberDetail'; 
import { MyDispatchContext, MyUserContext } from './configs/Contexts';
import MyUserReducer from './configs/MyUserReducer';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BillStack() {
  return (
    <Stack.Navigator initialRouteName="BillList" screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 30, 
          fontWeight: 'bold',
          color:'green',
        },
      }} >

      <Stack.Screen name="BillList" component={BillList} options={{ title: 'DANH SÁCH HÓA ĐƠN' }} />
      <Stack.Screen name="AddBill" component={AddBill} options={{ title: 'THÊM HÓA ĐƠN' }} />
      <Stack.Screen name="BillDetail"component={BillDetail} options={{ title: 'CHI TIẾT HÓA ĐƠN' }} />
    </Stack.Navigator>
  );
}

function FeedbackStack() {
  return (
    <Stack.Navigator initialRouteName="FeedbackList" screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 28, 
          fontWeight: 'bold',
          color:'green',
        },
      }} >

      <Stack.Screen name="FeedbackList" component={FeedbackList} options={{ title: 'DANH SÁCH PHẢN ÁNH'}} />
      <Stack.Screen name="Feedback"component={Feedback} options={{ title: 'PHẢN ÁNH TÌNH TRẠNG' }} />
      <Stack.Screen name="FeedbackDetail"component={FeedbackDetail} options={{ title: 'CHI TIẾT PHẢN ÁNH' }} />
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
          color:'green',
        },
      }} >
      <Stack.Screen name="Payment" component={Payment} options={{ title: 'DANH SÁCH HÓA ĐƠN CHƯA THANH TOÁN' }} />
      <Stack.Screen name="Pay"component={Pay} options={{ title: 'THANH TOÁN' }} />
    </Stack.Navigator>
  );
}


function FamemberStack() {
  return (
    <Stack.Navigator initialRouteName="FamemberList" screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18, 
          fontWeight: 'bold',
          color:'green',
        },
      }} >
      <Stack.Screen name="FamemberList" component={FamemberList} options={{ title: 'DANH SÁCH ĐĂNG KÝ' }} />
      <Stack.Screen name="Famember"component={Famember} options={{ title: 'ĐĂNG KÝ XE CHO NGƯỜI THÂN' }} />
      <Stack.Screen name="FamemberDetail" component={FamemberDetail} options={{ title: 'THÔNG TIN ĐĂNG KÝ' }} />
    </Stack.Navigator>
  );
}

function ItemStack() {
  return (
    <Stack.Navigator initialRouteName="ItemList" screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18, 
          fontWeight: 'bold',
          color:'green',
        },
      }} >
      <Stack.Screen name="ItemList" component={ItemList} options={{ title: 'TỦ HÀNG ĐIỆN TỬ' }} />
      <Stack.Screen name="AddItem"component={AddItem} options={{ title: 'THÊM HÀNG ĐIỆN TỬ' }} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ title: 'THÔNG TIN HÀNG' }} />
    </Stack.Navigator>
  );
}


function ProfileAndChange() {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontSize:28,
            fontWeight:'bold',
            color:'green', 
        },
      }} >
      <Stack.Screen name="Profile" component={Profile} options={{ title: '' }} />
      <Stack.Screen name="ChangePassword"component={ChangePassword} options={{ title: 'ĐỔI MẬT KHẨU' }} />
      <Stack.Screen name="ChangeAvatar"component={ChangeAvatar} options={{ title: 'ĐỔI ẢNH ĐẠI DIỆN' }} />
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

      <Drawer.Screen name='Tủ đồ điện' component={ItemStack} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
     />

      <Drawer.Screen name='Khảo sát' component={Survey} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
      />

      <Drawer.Screen name='Phản ánh' component={FeedbackStack} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
     />

     <Drawer.Screen name='Đăng ký xe' component={FamemberStack} 
        options={{
          drawerActiveTintColor: 'green', 
        }}
     />

    <Drawer.Screen name='Thống kê khảo sát' component={FamemberStack} 
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
                <Tab.Screen name="Đăng nhập" component={Login} options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="login" color={color} size={size} />
                  ),
                }} />
            
            ) : (
              <>
                <Tab.Screen name="Đăng ký" component={Register} options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-plus" color={color} size={size} />
                  ),
                }} />
                
              <Tab.Screen name="Hồ sơ" component={ProfileAndChange} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }} />

              </>
            )}

          </Tab.Navigator>
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;
