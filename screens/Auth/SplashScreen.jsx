import React from 'react'
import { View, Text, Dimensions, Image , TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import Bubles from '../../Components/Bubles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SplashScreen = ({ navigation }) => {

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(33,109,132, 1)', 'transparent']}
        style={styles.background}
      />
      
      <Bubles  />

      {/* <Text style={{fontWeight: 'bold', fontSize: 32, colore: '#01879B', alignSelf: 'center'}}>ToDo</Text> */}

      <View style={{ }}>
        <Image
          style={{width: windowWidth* 0.6, height: 200, resizeMode: 'contain', alignSelf: 'center'}}
          source={require('../../assets/logo_med.png')}
        />
      </View>

      <View style={{width: windowWidth * 0.7, alignSelf: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '900'}}>Lorem ipsum dolor sit amet</Text>
        <Text style={{ fontSize: 16 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
      </View>

      <TouchableOpacity 
        style={{width: windowWidth * 0.8, alignSelf: 'center', backgroundColor: '#219EBA', paddingHorizontal: "10%", paddingVertical: "3%", marginTop: "20%", borderRadius: 3}}
        onPress={()=> navigation.navigate('login')}
      >
        <Text style={{fontWeight: '900', color: 'white', alignSelf: 'center', fontSize: 16}}>Get Started</Text>
      </TouchableOpacity>

      


    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight ,
  },
})