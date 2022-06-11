import React, {useEffect, useState, useContext} from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalReservation from '../Components/ModalReservation';
  import Bubles from '../Components/Bubles';
  import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const HomeScreen = () => {

  const [items, setItems] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [allData, setallData] = useState([]);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');

  const [clicked, setClicked]= useState('');
  
  const searchFilter = (text) => {
    if(text) {
      const NewData = allData.filter((item) => {
          const itemData = item.nom ? item.nom.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setfilterData(NewData);
      setSearch(text);
    } else {
      setfilterData(allData);
      setSearch(text);
    }
  }
  
  const categoryFilter = (text) => {
    if(text) {
      const NewData = masterData.filter((item) => {
          const itemData = item.category ? item.category.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setallData(NewData);
      setfilterData(NewData);
      setClicked(text);
    } else {
      setallData(masterData);
      setfilterData(masterData);
      setClicked('');
    }
  } 


  const fetchData = async () => {

    const result = await axios.get(`${path}/medic`);
    if (result.data.success){
      setmasterData(result.data.data.slice(0).reverse());
      setfilterData(result.data.data.slice(0).reverse());
      setallData(result.data.data.slice(0).reverse());
    }
   
    const users = await axios.get(`${path}/user`);
    if (users.data.success){
      setUsers(users.data.data.slice(0).reverse());
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  

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
      <View style={{width: '90%', height: 40, display: 'flex', flexDirection: 'row', alignSelf: 'center', alignItems: "center", borderWidth: 1, borderRadius: 10, padding: 1, justifyContent: 'space-evenly', backgroundColor: '#001A1C', marginBottom: 20}}  >

        <TouchableOpacity
          style={[styles.groupbuttons, clicked === '' ? styles.clicked : styles.notclicked]}
          onPress={()=> {categoryFilter(''); }}
        >
          <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.groupbuttons, clicked === 'medicament' ? styles.clicked : styles.notclicked]}
          onPress={()=> {categoryFilter('medicament'); setfilterData(allData)}}
        >
          <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>médicaments</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.groupbuttons, clicked === 'paramedicaux' ? styles.clicked : styles.notclicked]}
          onPress={()=> categoryFilter('paramedicaux')}
        >
          <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>paramédicaux</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.groupbuttons, clicked === 'appareillage' ? styles.clicked : styles.notclicked]}
          onPress={()=> categoryFilter('appareillage')}
        >
          <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>Appareillage</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', paddingLeft: "10%"}} >
        <TextInput
          style={{height: windowHeight * 0.06, borderWidth: 1, paddingHorizontal: "5%", borderRadius: 5, backgroundColor: 'rgba(230,238,241,1)', borderColor: 'white', fontSize: 16, fontWeight: '700', width: "90%"}}
          onChangeText={searchFilter}
          value={search}
          placeholderTextColor='#6d6e6e'
          placeholder="Search"
          keyboardType="default"
        />
        <TouchableOpacity
          style={{alignContent: 'center', justifyContent: 'center', marginLeft: "-10%"}}        
        >
          <MaterialCommunityIcons name='text-box-search-outline' size={25} />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: windowHeight * 0.05, height: windowHeight * 0.675, paddingBottom: "1%", paddingHorizontal: "2%" }} >
        <ScrollView>
        {filterData.map(({ _id, nom, code, dci, qte, date, forme, classe, image, id_user }, idx) => {

          if (qte === 0) {
            return ;
          }
          return (
            <TouchableOpacity key={idx}
              onPress={() => {setModalVisible(!modalVisible); setId(_id)}}
            >
              <View  style={{flexDirection: 'row', borderRadius: 5, backgroundColor: '#d1e6e6'}}>
                <Image
                  style={{width: windowWidth * 0.5, alignSelf: 'center', resizeMode: 'contain', aspectRatio: 4/3, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}
                  source={{
                    uri: `${path}/uploads/images/${image}`
                  }}
                />
                <View style={{width: windowWidth * 0.5, paddingHorizontal: '3%'}}> 
                  <View style={{width:  '100%', paddingHorizontal: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}> 
                    <Text style={{ fontSize: 15, fontWeight: '500', alignSelf: 'flex-end'}} >{qte}</Text>
                  </View>
                  <View style={{ alignItems: 'center'}}> 
                    <Text style={{ fontSize: 20, fontWeight: '500'}} >{nom}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '500'}} >{code}</Text>
                  </View>
                  <View style={{height: windowHeight * 0.02, justifyContent: "center", paddingHorizontal: "5%"}} >
                    <View style={{borderTopWidth: 0.5, borderColor: '#9f9f9f'}} ></View>
                  </View> 
                  <Text style={{ fontSize: 15, fontWeight: '500'}} >DCI: {dci}</Text>
                  <Text style={{ fontSize: 15, fontWeight: '500'}} >{forme}</Text>
                  <Text style={{ fontSize: 15, fontWeight: '500'}} >{classe}</Text>
                  <Text style={{ fontSize: 10, fontWeight: '500', color: '#ba160c', alignSelf: "flex-end", marginRight: '12%'}} >{date}</Text>
                
                </View>
                
              </View>

              <View style={{height: windowHeight * 0.02, justifyContent: "center", paddingHorizontal: "5%"}} >
                <View style={{borderWidth: 0.5, borderColor: '#dedede'}} ></View>
              </View>
            </TouchableOpacity>
          )})}

      
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
              <ModalReservation fetchData={fetchData} id={id} setModalVisible={setModalVisible} />
            </ScrollView>
                    
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default HomeScreen

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