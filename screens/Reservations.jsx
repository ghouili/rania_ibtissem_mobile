import React, {useEffect, useState, useContext} from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { MainContext } from '../hooks/MainContext';
import Bubles from '../Components/Bubles';
import axios from 'axios';          

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Reservations = ({ navigation }) => {

    const { auth } = useContext(MainContext);
    const [items, setItems] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filterData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [medics, setMedics] = useState([]);
    
    const fetchData = async () => {

        const result = await axios.post(`${path}/reservation/${auth._id}`);
        if (result.data.success){
        setmasterData(result.data.data.slice(0).reverse());
        setfilterData(result.data.data.slice(0).reverse());
        }
    
        const users = await axios.get(`${path}/user`);
        if (users.data.success){
        setUsers(users.data.data.slice(0).reverse());
        }
    
        const medics = await axios.get(`${path}/medic`);
        if (medics.data.success){
        setMedics(medics.data.data.slice(0).reverse());
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
  
    // {qte, id_medic, id_user}
  return (
    <View style={{flex:1}}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(33,109,132, 1)', 'transparent']}
        style={styles.background}
      />
      <View style={{marginTop: "-10%", marginLeft: "-10%"}}>
        <Bubles />
      </View>

      <View style={{marginTop: windowHeight * 0.0, height: windowHeight * 0.675, paddingBottom: "1%", paddingHorizontal: "2%" }} >
            <ScrollView>
                {filterData.map(({_id, ord_image, qte, id_medic, id_user}, idx) => {

                    let medic = medics.find(({_id}) => _id === id_medic);

                    return (
                        <TouchableOpacity key={idx}
                          onPress={() => {setModalVisible(!modalVisible); setId(_id)}}
                        >
                          <View  style={{flexDirection: 'row', borderRadius: 5, backgroundColor: '#d1e6e6'}}>
                            <Image
                              style={{width: windowWidth * 0.5, alignSelf: 'center', resizeMode: 'contain', aspectRatio: 4/3, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}
                              source={{
                                uri: `${path}/uploads/images/${ord_image}`
                              }}
                            />
                            <View style={{width: windowWidth * 0.5, paddingHorizontal: '3%'}}> 
                              <View style={{width:  '100%', paddingHorizontal: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}> 
                                <Text style={{ fontSize: 15, fontWeight: '500', alignSelf: 'flex-end'}} >{qte}</Text>
                              </View>
                                {medic &&
                                    <View style={{ alignItems: 'center'}}> 
                                        <Text style={{ fontSize: 20, fontWeight: '500'}} >{medic.nom}</Text>
                                        <Text style={{ fontSize: 10, fontWeight: '500'}} >{medic.code}</Text>
                                    </View>
                                }
                              <View style={{height: windowHeight * 0.02, justifyContent: "center", paddingHorizontal: "5%"}} >
                                <View style={{borderTopWidth: 0.5, borderColor: '#9f9f9f'}} ></View>
                              </View>
                                {medic &&
                                    <>
                                        <Text style={{ fontSize: 15, fontWeight: '500'}} >DCI: {medic.dci}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '500'}} >{medic.forme}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '500'}} >{medic.classe}</Text>
                                        <Text style={{ fontSize: 10, fontWeight: '500', color: '#ba160c', alignSelf: "flex-end", marginRight: '12%'}} >{medic.date}</Text>
                                    </>
                                }
                            </View>
                            
                          </View>
            
                          <View style={{height: windowHeight * 0.02, justifyContent: "center", paddingHorizontal: "5%"}} >
                            <View style={{borderWidth: 0.5, borderColor: '#dedede'}} ></View>
                          </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>


    </View>
  )
}

export default Reservations

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight ,
      },
})