import Recat, {useContext, useEffect, useState} from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, TextInput, Alert, StyleSheet } from 'react-native';

// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import {Picker} from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import mime from 'mime';
// import moment from 'moment';

import { MainContext } from '../hooks/MainContext';


const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

// const today = new Date();

const ModalReservation = ({ fetchData, id, setModalVisible }) => {

    console.log(id);
    const { auth } = useContext(MainContext);
    const [image, setImage] = useState(null);
    const [nbr, setNbr] = useState('');
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result);
        }
    };
    
    const pickCamera = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result);
        }
    };

    const Submit = async () => {

        const url = `${path}/reservation/add`;
        const fileUri = image.uri;
        const newImageUri = "file:///" + fileUri.split("file:/").join("");
        const formData = new FormData();
        formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
        });
        formData.append("qte", nbr);

        formData.append("id_user", auth._id);
        formData.append("id_medic", id);
        
        const options = {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        };
        console.log(formData);

        let response = await fetch( url, options);

        let result = await response.json();
        if (result.success === true ) {
            setImage(null);
            setNbr('');
            fetchData();
            setModalVisible(false);
            Alert.alert("Success", result.message, [
            { text: "fermer" },
            ]);
        } else {
            Alert.alert("Error", result.message, [
            { text: "fermer" },
            ]);
        }
        
    }

  return (
    <View>
        {/* <ScrollView> */}
            <View style={{ paddingHorizontal: "5%", paddingTop: "5%"}}>
                <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-between'}}>
                    {image ? (
                        <>
                            <Image
                                style={{width: "100%", aspectRatio: 4/3, borderRadius: 5, resizeMode: 'contain' }}
                                source={{ uri: image.uri }} 
                            />    
                        </>
                    ): 
                        <>
                            <TouchableOpacity
                                style={{width: "47.5%", backgroundColor: 'rgba(230,238,241,1)', justifyContent: 'center', alignItems: 'center', height: WindowHeight * 0.2,borderWidth: 1, borderColor: 'white', borderRadius: 5}}
                                onPress={pickCamera}
                            >
                                <Ionicons name='camera-outline' color='black' size={40} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{width: "47.5%", backgroundColor: 'rgba(230,238,241,1)', justifyContent: 'center', alignItems: 'center', height: WindowHeight * 0.2,borderWidth: 1, borderColor: 'white', borderRadius: 5}}
                                onPress={pickImage}
                            >
                                <EvilIcons name='image' color='black' size={50} />
                            </TouchableOpacity>
                        </>
                    }
                </View>

                <View style={{marginTop: "5%"}}>
                    
                    {/* <TextInput
                        style={{height: WindowHeight * 0.06, marginBottom: "4%", borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                        placeholderTextColor='#6d6e6e'
                        placeholder="Title"
                        keyboardType="default"
                    /> */}
                    
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: "4%"}} >
                        <TextInput
                            style={{height: WindowHeight * 0.06, marginBottom: "0%", borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700', width: "47%"}}
                            onChangeText={(text) => setNbr(text)}
                            value={nbr}
                            placeholderTextColor='#6d6e6e'
                            placeholder="How Many"
                            keyboardType="numeric"
                        />

                        {/* <View style={{display: 'flex', alignItems:'center', width: '47%'}} >
                            <TouchableOpacity
                                style={{width: '100%', display: 'flex', alignItems:'center', flexDirection: 'row'}}
                                onPress={showDatepicker}
                                >
                                
                                <TextInput
                                    style={{height: WindowHeight * 0.06, borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700', width: '70%'}}
                                    placeholder='Expire date' 
                                    placeholderTextColor='#919191'
                                    autoCapitalize='none'
                                    keyboardType='default'
                                    onChangeText={(text) => setDate_exp(text)}
                                    
                                    value={date_exp.toString()}
                                />
                                 
                                <View style={{width:  '30%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <EvilIcons name='calendar' size={35} color='#919191' />
                                </View>
                                </TouchableOpacity>
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
                        </View> */}
                    </View>


                    
                    
                    {/* <TextInput
                        style={{ marginBottom: "0%", borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                        onChangeText={(text) => setDesc(text)}
                        value={desc}
                        multiline
                        editable
                        maxLength={800}
                        numberOfLines={6}
                        placeholderTextColor='#6d6e6e'
                        placeholder="Say something"
                        keyboardType="default"
                    /> */}
                    
                </View>

                <TouchableOpacity 
                    style={{width: "40%", alignSelf: 'center', backgroundColor: '#219EBA',  paddingVertical: "3%", marginTop: "5%", alignSelf: 'flex-start', borderRadius: 5}}
                    onPress={Submit}
                >
                    <Text style={{fontWeight: '900', color: 'white', alignSelf: 'center', fontSize: 16}}>Save</Text>
                </TouchableOpacity>
                
                {/* <View  style={{ height: "40%"}} /> */}
            </View>
        {/* </ScrollView> */}
    </View>
  )
}

export default ModalReservation

const styles = StyleSheet.create({})