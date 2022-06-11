import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ProvidContext } from './hooks/MainContext';

import MainNav from './Navigation/MainNav';

export default function App() {
  global.path ='http://192.168.1.100:4000'
  return (
    <NavigationContainer>
      <ProvidContext>
          <MainNav /> 
      </ProvidContext>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
