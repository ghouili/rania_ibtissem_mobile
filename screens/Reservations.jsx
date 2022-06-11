import React, {useEffect, useState, useContext} from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalReservation from '../Components/ModalReservation';

import { MainContext } from '../hooks/MainContext';
import Bubles from '../Components/Bubles';
import axios from 'axios';          

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Reservations = ({ navigation }) => {

    const { auth } = useContext(MainContext);
    const [items, setItems] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [medics, setMedics] = useState([]);
    const [data, setData] = useState({
      _id:'',
      ord_image:'',
      qte:0
    });

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
        <Bubles refresh={fetchData} />
      </View>

      <View style={{marginTop: windowHeight * 0.0, height: windowHeight * 0.675, paddingBottom: "1%", paddingHorizontal: "2%" }} >
            <ScrollView>
                {filterData.map(({_id, ord_image, qte, id_medic, id_user}, idx) => {

                    let medic = medics.find(({_id}) => _id === id_medic);

                    return (
                        <TouchableOpacity key={idx}
                          onPress={() => {setModalVisible(!modalVisible); setId(id_medic); setData({_id: _id, ord_image: ord_image, qte: qte})}}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity 
              style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <MaterialCommunityIcons style={{alignSelf: 'flex-end'}} name='close-box-outline' color='#9c0000' size={25} />
            </TouchableOpacity>
            <ScrollView>
              <ModalReservation fetchData={fetchData} id={id} setModalVisible={setModalVisible} data={data} />
            </ScrollView>
                    
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(166,223,240, 1)',
    borderRadius: 5,
    padding: 5,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'scroll',
    // flexWrap: 'wrap'
  },
// button: {
  //   borderRadius: 5,
  //   padding: 10,
  //   elevation: 2
  // },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
// },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  clicked: {
    backgroundColor: 'rgba(33,109,132, 1)', 
  }, 
  notclicked: {

  },
  groupbuttons: {
    width: '25%', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10
  }
})