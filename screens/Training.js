import { StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps'
import { Entypo } from '@expo/vector-icons';
//import Polyline from '@mapbox/polyline';

export default function Training({item}) {


    const timeToFormat = () => {
        const seconds = (item.item.endingTime.seconds - item.item.startingTime.seconds) / (item.item.length / 1000)
        const minutes = Math.floor(seconds / 60)
        
        const clockSeconds = seconds - minutes * 60
  
        return minutes + 'm : ' + clockSeconds.toFixed(1) + 's'
      }

// ((item.item.endingTime.seconds - item.item.startingTime.seconds) / (item.item.length / 1000))
    
return(
        <View style={styles.item}>
            
                <View style={styles.dButtonContainer}>
                    <TouchableOpacity
                    onPress={() => console.log('delete')}
                    style={styles.deleteButton}
                    >
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                </View>
               

                <View style={styles.row}>
                    <Text style={styles.data}>Run length: </Text>
                    <Text style={styles.data}>{(item.item.length / 1000).toFixed(2)} km</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.data}>Time moved: </Text>
                    <Text style={styles.data}>{ ((item.item.endingTime.seconds - item.item.startingTime.seconds)/60).toFixed(2)  } minutes</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.data}>Average Speed: </Text>
                    <Text style={styles.data}>{timeToFormat()} / km</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.data}>Date: </Text>
                    <Text style={styles.data}>{`${new Date(item.item.startingTime.seconds * 1000)}`}</Text>
                </View>

               
                <MapView
                    style={styles.map} 
                    mapType='terrain'
                    liteMode={true}
                    initialRegion={{
                        latitude: item.item.coordinates[0].latitude,
                        longitude: item.item.coordinates[0].longitude,
                        latitudeDelta: 0.0322,
                        longitudeDelta: 0.0221
                    }}>

                    <MapView.Polyline 
                    coordinates={item.item.coordinates}
                    strokeWidth={2}
                    strokeColor="red"/>
                </MapView>
            
                
        </View> 
    )}

    const styles = StyleSheet.create({
        item: {
          borderRadius: 8,
          width:'100%',
          marginTop:5,
          padding:5,
          backgroundColor: 'white',
          alignItems:'center'
        },
        button: { 
            width:'20%'
        },
        row: {
            flexDirection:'row',
            padding:4,
            borderStyle:'solid',
            marginTop:5,
        },
        text:{
            marginTop:5,
            width:'75%'
        },
        info: {
            padding:5,
            backgroundColor:'#778899',
            borderRadius: 8,
        },
        data:{
            width:'50%'
        },
        map:{
            flex: 1,
            height:300,
            width:'90%',
            margin:10,
        },
        deleteButton: {
            width:'5%',
            height:'100%',
            marginLeft:'90%'
        },
        dButtonContainer:{
            width:'100%',
            height:20,
            marginTop:'4%',
        }
    })