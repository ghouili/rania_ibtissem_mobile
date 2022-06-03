import React, {useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView,TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


import Bubles from '../Components/Bubles';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}

const AddNotesScreen = () => {

    const [forceUpdate, forceUpdateId] = useForceUpdate();
    
    const [image, setImage] = useState(null);
    const [cin, setCin] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState(null)

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
          setImage(result.uri);
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
          setImage(result.uri);
        }
    };

    const CreateNotes = () => {
        if (cin === '' || name === "" ) {
            return false;
        }
    
        db.transaction(
        (tx) => {
            tx.executeSql("insert into notes (cin, name) values (?, ?)", [cin, name]);
            tx.executeSql("select * from notes", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
            );
        },
        null,
        forceUpdate
        );
        

    }

  return (
    <View style={{flex: 1}}>
        <Bubles />
        <Text style={{fontWeight: 'bold', fontSize: 25, color: '#01879B', alignSelf: 'center'}}>ADD Notes</Text>

        <ScrollView>
            <View style={{height: windowHeight * 0.7, paddingHorizontal: "5%", paddingTop: "5%", marginTop: windowHeight * 0.05}}>
                <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-between'}}>
                    {image ? (
                        <>
                            <Image
                                style={{width: "100%", aspectRatio: 4/3, borderRadius: 5 }}
                                source={{ uri: image }} 
                            />    
                        </>
                    ): 
                        <>
                            <TouchableOpacity
                                style={{width: "47.5%", backgroundColor: 'rgba(230,238,241,1)', justifyContent: 'center', alignItems: 'center', height: windowHeight * 0.2,borderWidth: 1, borderColor: 'white', borderRadius: 5}}
                                onPress={pickCamera}
                            >
                                <Ionicons name='camera-outline' color='black' size={40} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{width: "47.5%", backgroundColor: 'rgba(230,238,241,1)', justifyContent: 'center', alignItems: 'center', height: windowHeight * 0.2,borderWidth: 1, borderColor: 'white', borderRadius: 5}}
                                onPress={pickImage}
                            >
                                <EvilIcons name='image' color='black' size={50} />
                            </TouchableOpacity>
                        </>
                    }
                </View>


                <View style={{marginTop: "5%"}}>
                    <TextInput
                        style={{height: windowHeight * 0.06, marginBottom: "4%", borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                        onChangeText={(text) => setCin(text)}
                        // value={number}
                        placeholderTextColor='#6d6e6e'
                        placeholder="CIN"
                        keyboardType="numeric"
                    />
                    
                    <TextInput
                        style={{height: windowHeight * 0.06, marginBottom: "0%", borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700'}}
                        onChangeText={(text) => setName(text)}
                        // value={number}
                        placeholderTextColor='#6d6e6e'
                        placeholder="Full Name"
                        keyboardType="numeric"
                    />
                    
                </View>
                <TouchableOpacity 
                    style={{width: "40%", alignSelf: 'center', backgroundColor: '#219EBA',  paddingVertical: "3%", marginTop: "5%", alignSelf: 'flex-start', borderRadius: 5}}
                    onPress={CreateNotes}
                >
                    <Text style={{fontWeight: '900', color: 'white', alignSelf: 'center', fontSize: 16}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{width: "40%", alignSelf: 'center', backgroundColor: '#219EBA',  paddingVertical: "3%", marginTop: "5%", alignSelf: 'flex-start', borderRadius: 5}}
                    onPress={() => console.log(data)}
                >
                    <Text style={{fontWeight: '900', color: 'white', alignSelf: 'center', fontSize: 16}}>check</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        
    </View>
  )
}

export default AddNotesScreen

const styles = StyleSheet.create({})