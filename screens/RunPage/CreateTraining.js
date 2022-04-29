import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps'
import React from 'react'
import { sessionStorage } from '../../classes/Storage'
import { startLocationTrackingAsync, stopLocationTrackingAsync } from './Tracking'
import {db, auth} from '../../firebase'
import { collection, addDoc} from "firebase/firestore"
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


export default function CreateTraining() {

    const [pressed, setPressed] = React.useState(false)
    const [locations, setLocations] = React.useState([])
    const [length, setLength] = React.useState(0)
    const [time, setTime] = React.useState(0)

    
    React.useEffect(() => {
      let interval = null
      if (pressed) {
        interval = setInterval(() => {
          refreshInfo()
        }, 1000) 
        } else {
          clearInterval(interval)
        }

        return () => {
          clearInterval(interval)
          
        }

    },[pressed])

    React.useEffect(() => console.log(length),[length])

    const buttonPressed = () => {

        if(!pressed) {
          startLocationTrackingAsync()
          setPressed(true)
        } else {
          stopLocationTrackingAsync()
          setPressed(false)
          trainingToDb()
          refreshInfo()
        }
      } 

    
    const timeToFormat = () => {
      const seconds = Math.ceil(time / 1000)
      return seconds + 's'
    }

    const refreshInfo = () => {
      
      const coords = sessionStorage.getItem('coords')
      coords.coords ? setLocations(coords.coords) : setLocations([])
      coords.runLength ? setLength(coords.runLength) : setLength(0)
      
      const currentTime = new Date()

      setTime(currentTime - sessionStorage.getItem('startingTime'))
    }

    const trainingToDb = () => {
      const endingTime = new Date()
      const coordinates = sessionStorage.getItem('coords')
      try {
      addDoc(collection(db, `trainings/`),
        {
            startingTime: sessionStorage.getItem('startingTime'),
            endingTime: endingTime,
            coordinates: coordinates.coords,
            length: length,
            user: auth.currentUser.uid
        }
      ).catch(err => console.error(err))
      } catch {console.log('cannot save run without gps')}
    }

    return(
        <View style={styles.screen} >

            <MapView 
            style={ styles.map } 
            followsUserLocation
            showsUserLocation
            mapType='terrain'
            >
                <MapView.Polyline 
                coordinates={locations}
                strokeWidth={2}
                strokeColor="red"/>

            </MapView>

          <View style={styles.infoContainer} >
            <View style={styles.info} >
              
              <View style={styles.infoPart}>
                <Text style={styles.infoText}>{Math.ceil(length) / 1000} km</Text>
              </View>

              
              <View style={styles.infoPart}>
                <Text style={styles.infoText}>{timeToFormat()}</Text>
              </View>
            </View>

            <TouchableOpacity
                style={styles.startButton}
                onPress={buttonPressed}
               >
                {
                !pressed ? 
                  <View style={styles.buttonOnFinish}> 
                    <Text style={styles.buttonText}> Start the run </Text> 
                    <MaterialCommunityIcons name="whistle" size={28} color="darkred" />
                  </View>
                  : <View style={styles.buttonOnFinish}> 
                      <Text style={styles.buttonText}> Finish the run </Text> 
                      <FontAwesome5 name="flag-checkered" size={24} color="black" />
                    </View>}
                
            </TouchableOpacity>
          
          </View >
          
        </View>
        
    )

  
}

const styles = StyleSheet.create({
  map:{ 
    flex:1
  },
  screen:{ 
    flex:1 
  },
  info:{
    justifyContent: 'center',
    flexDirection:'row', 
    
  },
  infoContainer: {
    alignItems: 'center',
    height:'30%',
    backgroundColor:'#F5F5F5',
    borderColor:'#F5F5F5',
    borderTopColor:'black',
    borderWidth:1
  },
  startButton:{ 
    marginTop: '5%',
    padding:10,
    borderRadius:10,
    backgroundColor:'white',
    width:'85%',
    alignItems:'center',
    borderWidth:1
  },
  infoPart:{ 
    backgroundColor:'white',
    marginTop: '5%',
    margin: '5%',
    alignItems:'center',
    padding:10,
    width: '40%',
    borderRadius:10,
    borderWidth:1
  },
  buttonText:{
    fontSize: 25,
    color:'black'
  },
  buttonOnFinish:{
    flexDirection:'row'
  },  
  infoText:{
    fontSize: 20
  }

})