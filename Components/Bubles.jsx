import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Bubles = ({ notif, refresh }) => {

  return (
    <View>
      {!notif && 
        <TouchableOpacity
          style={{position: 'absolute', top: 75, left: 60, zIndex: 70}}
        >
          <Ionicons name='notifications' size={25}  />
        </TouchableOpacity>
      }
      {refresh &&
        <TouchableOpacity
        style={{position: 'absolute', top: 75, right: 70, zIndex: 70}}
          onPress={refresh}
        >
          <FontAwesome name='refresh' size={25}  />
        </TouchableOpacity>
      }
        
      <View style={{width: windowWidth* 0.4, height: windowWidth* 0.4, borderRadius: 150, backgroundColor: 'rgba(128, 200, 215, 0.7)', marginTop: -windowHeight*0.08, marginLeft: -windowWidth * 0.01 }}></View>
      <View style={{width: windowWidth* 0.4, height: windowWidth* 0.4, borderRadius: 150, backgroundColor: 'rgba(128, 200, 215, 0.7)', marginTop: -windowHeight*0.12, marginLeft: -windowWidth * 0.15 }}></View>
    </View>
  )
}

export default Bubles