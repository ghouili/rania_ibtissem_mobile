import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';
import moment from 'moment';
import axios from 'axios'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { MainContext } from '../../hooks/MainContext';

import Bubles from '../../Components/Bubles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const today = new Date();
const RegisterScreen = ({ navigation }) => {

    let { setChanged } = useContext(MainContext);
    const [selectedLanguage, setSelectedLanguage] = useState('homme');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState();
    const [adress, setAdress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(today);
    const [show, setShow] = useState(false);

    // affiche data picker :: //////////////////////////////////////////////
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // console.log( date)
        // console.log(moment(date).format('DD/MM/YYYY'));
        setBirthdate(moment(currentDate).format('DD-MM-YYYY'));
        setShow(Platform.OS === 'ios');
        // setDate_exp(moment(currentDate).format('DD/MM/YYYY'));
    };

    const register = async ({ navigation }) => {

        const result = await axios.post(`${path}/user/register`, {
            nom: nom,
            prenom: prenom,
            email: email,
            tel: tel,
            adress: adress,
            birthdate: date,
            sexe: selectedLanguage,
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
            style={{width: windowWidth* 0.6, height: 80, resizeMode: 'contain', alignSelf: 'center'}}
            source={require('../../assets/logo_med.png')}
            />
            {/* <View style={styles.view_sous_title}>
                <Text style={styles.sou_title}>GLorem ipsum doloo amet!</Text>
                <Text style={{ fontSize: 16 }}>Lorem ipsum dolor sit amet texte .</Text>
            </View> */}

            <View style={{marginTop: "5%", paddingHorizontal: "4%"}}>
                <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: "4%"}} >
                    <TextInput
                        style={{width: '48%',height: windowHeight * 0.06, borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                        onChangeText={(text)=> setNom(text)}
                        value={nom}
                        placeholderTextColor='#6d6e6e'
                        
                        placeholder="Nom"
                        keyboardType="default"
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={{width: '48%', height: windowHeight * 0.06, borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                        onChangeText={(text)=> setPrenom(text)}
                        value={prenom}
                        placeholderTextColor='#6d6e6e'
                        
                        placeholder="Prenom"
                        keyboardType="default"
                        autoCapitalize='none'
                    />
                </View>

                <TextInput
                    style={{height: windowHeight * 0.06, marginBottom: "4%", borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                    onChangeText={(text)=> setEmail(text)}
                    value={email}
                    placeholderTextColor='#6d6e6e'
                    
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize='none'
                />

                <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: "4%"}} >
                    <View style={{width: '48%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                        <TouchableOpacity 
                            style={{width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                            onPress={()=> setShow(true)}
                        >
                            <EvilIcons name='calendar' size={35} />
                        </TouchableOpacity>
                        <TextInput
                            style={{width: '75%',height: windowHeight * 0.06, borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                            onChangeText={(text)=> setBirthdate(text)}
                            value={birthdate}
                            placeholderTextColor='#6d6e6e'
                            
                            placeholder="Birthdate"
                            keyboardType="default"
                            autoCapitalize='none'
                        />

                    </View>
                    {show && (
                        <DateTimePicker
                        // testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        
                        />
                        )}
                    {/* <View style={{width: '48%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1}} >
                           


                        <TextInput
                            style={{width: '100%', height: windowHeight * 0.06, borderWidth: 1, paddingHorizontal: "5%", borderRadius: 10, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholderTextColor='#6d6e6e'
                            
                            placeholder="Prenom"
                            keyboardType="numeric"
                        />
                    </View> */}
                    <View style={{width: '48%', height: windowHeight * 0.06, flexWrap: 'wrap', overflow: 'hidden', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5,  backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}>
                        <Picker
                            style={{width: '100%',  borderWidth: 1, paddingHorizontal: "5%"}}
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="Homme" value="homme" />
                            <Picker.Item label="Femme" value="femme" />
                        </Picker>
                    </View>
                </View>

                <TextInput
                    style={{height: windowHeight * 0.06, marginBottom: "4%", borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                    onChangeText={(text)=> setAdress(text)}
                    value={adress}
                    placeholderTextColor='#6d6e6e'
                    
                    placeholder="Adress"
                    keyboardType="default"
                    autoCapitalize='none'
                />

                <TextInput
                    style={{height: windowHeight * 0.06, marginBottom: "4%", borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                    onChangeText={(text)=> setTel(text)}
                    value={tel}
                    placeholderTextColor='#6d6e6e'
                    
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    autoCapitalize='none'
                />

                <TextInput
                    style={{height: windowHeight * 0.06, marginBottom: "4%", borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: 'rgb(230,238,241)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                    onChangeText={(text)=> setPassword(text)}
                    value={password}
                    placeholderTextColor='#6d6e6e'
                    secureTextEntry
                    placeholder="Password"
                    keyboardType="default"
                    autoCapitalize='none'
                />

               
            </View>

            <TouchableOpacity 
            style={{width: windowWidth * 0.9, alignSelf: 'center', backgroundColor: '#219EBA', paddingHorizontal: "10%", paddingVertical: "3%", marginTop: "10%", borderRadius: 3}}
            onPress={register}
            >
                <Text style={{fontWeight: '900', color: 'white', alignSelf: 'center', fontSize: 16}}>Sugn up</Text>
            </TouchableOpacity>
            <View style={{width: windowWidth * 0.45, alignSelf: 'center',  flexDirection: 'row', marginTop: "2%"}}>
                <Text style={{color: 'black',  }}>Already have an Account?</Text>
                <TouchableOpacity 
                    style={{}}
                    onPress={()=> navigation.navigate('login')}
                ><Text style={{color: '#219EBA' }} >Log in</Text></TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  )
}

export default RegisterScreen

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