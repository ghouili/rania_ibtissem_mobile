import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { MainContext } from '../hooks/MainContext';

import BottomNav from './BottomNav';
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';


const Stack = createStackNavigator();

const MainNav = () => {

  const  {auth} = useContext(MainContext);
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      {auth ?
      <Stack.Screen name='Main' component={BottomNav} />
      :
        <>
          <Stack.Screen name='splach' component={SplashScreen}  />
          <Stack.Screen name='login' component={LoginScreen}  />
          <Stack.Screen name='register' component={RegisterScreen}  />
        </>
      }


    </Stack.Navigator>
  )
}

export default MainNav

const styles = StyleSheet.create({})