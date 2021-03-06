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

const ModalReservation = ({ fetchData, id, setModalVisible, data }) => {

    console.log(id);
    const { auth } = useContext(MainContext);
    const [image, setImage] = useState(null);
    const [nbr, setNbr] = useState('');

    useEffect(() => {
      if(data) {
        return setNbr(data.qte);
      }
    }, [])
    
    
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
        
        let url;
        if (data){
            url  = `${path}/reservation/${data._id}`;
        } else {
            url = `${path}/reservation/add`;
        }

        let options;
        if(data) {
            options = {
                method: "Patch",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            };
        } else {
            options = {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            };

        }
        // console.log(formData);

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
                
                    {image ? (
                        <>
                            <Image
                                style={{width: "100%", aspectRatio: 4/3, borderRadius: 5, resizeMode: 'contain' }}
                                source={{ uri: image.uri }} 
                            />    
                        </>
                    ): data && data.ord_image ? (
                        <>
                            <Image
                                style={{width: "100%", aspectRatio: 4/3, borderRadius: 5, resizeMode: 'contain' }}
                                source={{
                                    uri: `${path}/uploads/images/${data.ord_image}`
                                }}
                            />
                            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20}}  >
                            <TouchableOpacity
                                style={{width: "35%", backgroundColor: 'rgba(230,238,241,1)', justifyContent: 'center', alignItems: 'center', height: WindowHeight * 0.13, borderWidth: 1, borderColor: 'white', borderRadius: 5}}
                                onPress={pickCamera}
                            >
                                <Ionicons name='camera-outline' color='black' size={40} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{width: "35%", backgroundColor: 'rgba(230,238,241,1)', justifyContent: 'center', alignItems: 'center', height: WindowHeight * 0.13, borderWidth: 1, borderColor: 'white', borderRadius: 5}}
                                onPress={pickImage}
                            >
                                <EvilIcons name='image' color='black' size={50} />
                            </TouchableOpacity>
                            </View>    
                        </>
                    ):
                        <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-between'}}>
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
                        
                        </View>
                    }

                <View style={{marginTop: "5%"}}>
                                       
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: "4%"}} >
                        <TextInput
                            style={{height: WindowHeight * 0.06, marginBottom: "0%", borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700', width: "47%"}}
                            onChangeText={(text) => setNbr(text)}
                            value={nbr.toString()}
                            placeholderTextColor='#6d6e6e'
                            placeholder="How Many"
                            keyboardType="numeric"
                        />

                        
                    </View>

                    
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