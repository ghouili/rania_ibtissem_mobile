import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Picker} from '@react-native-picker/picker';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Bubles from '../../Components/Bubles';
import { MainContext } from '../../hooks/MainContext';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {

    let { setChanged } = useContext(MainContext);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {

        const result = await axios.post(`${path}/user/login`, {
            email: email,
            password: password
        });

        if (result.data.success){
            const jsonValue = JSON.stringify(result.data.data);
            await AsyncStorage.setItem('user', jsonValue);
            setChanged(new Date());
            Alert.alert(
                "Success",
                result.data.message,
                [{ text: 'fermer' }]
            );
            // console.log(result.data.message)
        } else {
            Alert.alert(
                "Error !!",
                result.data.message,
                [{ text: 'fermer' }]
            );
            // console.log(result.data.message)
        }
    }
  return (
    <View style={ styles.container} >
    <LinearGradient
        // Background Linear Gradient
        colors={['rgba(33,109,132, 1)', 'transparent']}
        style={styles.background}
    />
    <ScrollView>
        <Bubles />
        <Image
        style={{width: windowWidth* 0.6, height: 80, resizeMode: 'contain', alignSelf: 'center', marginVertical: 50}}
        source={require('../../assets/logo_med.png')}
        />

        <View style={{marginTop: "5%", paddingHorizontal: "4%" }}>
            
            <TextInput
                style={{height: windowHeight * 0.06, marginBottom: "8%", borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                onChangeText={(text)=> setEmail(text)}
                value={email}
                placeholderTextColor='#6d6e6e'
                
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize='none'
            />

            <TextInput
                style={{height: windowHeight * 0.06, marginBottom: "4%", borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                onChangeText={(text)=>setPassword(text)}
                value={password}
                placeholderTextColor='#6d6e6e'
                
                placeholder="Password"
                keyboardType="default"
                autoCapitalize='none'
            />
           
        </View>

        <TouchableOpacity 
        style={{width: windowWidth * 0.9, alignSelf: 'center', backgroundColor: '#219EBA', paddingHorizontal: "10%", paddingVertical: "3%", marginTop: "10%", borderRadius: 3}}
        onPress={login}
        >
            <Text style={{fontWeight: '900', color: 'white', alignSelf: 'center', fontSize: 16}}>Log in</Text>
        </TouchableOpacity>
        <View style={{width: windowWidth * 0.45, alignSelf: 'center',  flexDirection: 'row', marginTop: "2%"}}>
            <Text style={{color: 'black',  }}>Already have an Account?</Text>
            <TouchableOpacity 
                style={{}}
            onPress={()=> navigation.navigate('register')}
            ><Text style={{color: '#219EBA' }} >Sign up</Text></TouchableOpacity>
        </View>
    </ScrollView>
</View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight ,
    },
    big_title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#01879B',
        alignSelf: 'center'
    },
    view_sous_title: {
        width: windowWidth * 0.7,
        alignSelf: 'center',
        marginTop: "10%"
    },
    sou_title : {
        fontSize: 20, 
        fontWeight: '900',
        alignSelf: 'center'
    }

})