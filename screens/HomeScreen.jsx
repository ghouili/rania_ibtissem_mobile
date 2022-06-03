import React, {useEffect, useState, useContext} from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Bubles from '../Components/Bubles';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [{
  _id: "627ba2f2fa4e1a754575a7f4",
  nom: "algezic",
  code: 619123456789456,
  dci: "medic companies",
  qte: 5,
  forme: "liquid",
  classe: "pain killers",
  date: "2022-06-05",
  image: "82851080-d120-11ec-b723-319c35576e7c.png",
  id_user: "62791ded5405130f7910d239",
  
}]

const HomeScreen = () => {

  const [items, setItems] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const searchFilter = (text) => {
    if(text) {
      const NewData = masterData.filter((item) => {
          const itemData = item.nom ? item.nom.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setfilterData(NewData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  }


  const fetchData = async () => {

    const result = await axios.get(`${path}/medic`);
    if (result.data.success){
      setmasterData(result.data.data.slice(0).reverse());
      setfilterData(result.data.data.slice(0).reverse());
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
        {filterData && 
        
        filterData.map(({ _id, nom, code, dci, qte, date, forme, classe, image, id_user }, idx) => (
            <>
              <View key={idx} style={{flexDirection: 'row', borderRadius: 5, backgroundColor: '#d1e6e6'}}>
                <Image
                  style={{width: windowWidth * 0.5, aspectRatio: 4/3, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}
                  source={{
                    uri: `${path}/uploads/images/${image}`
                  }}
                />
                <View style={{width: windowWidth * 0.5, paddingHorizontal: '3%'}}> 
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
            </>
          ))}

      
          

         

          
          
        </ScrollView>
      </View>

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
})