import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Reservations from '../screens/Reservations';


const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      //   title: '',
      //   headerStyle:{
      //     backgroundColor: 'rgba(0,0,0,0)',
      //   },
      //   headerLeft: () =>(
      //     <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, margin: 0}}>
      //       <Ionicons name='notifications' size={25}  />
      //     </View>
      //   ),
      }}
    >
      <Tab.Screen 
        name="postes" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          // unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      
      
      <Tab.Screen 
        name="Reservation" 
        component={Reservations} 
        options={{
          tabBarLabel: 'Reservation',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hand-right-outline" color={color} size={size} />
          ),
        }}
      />

      
      
      <Tab.Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />

      

    </Tab.Navigator>
  )
}

export default BottomNav

const styles = StyleSheet.create({})