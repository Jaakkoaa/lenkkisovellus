import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps'
import React from 'react'
import { sessionStorage } from '../../classes/Storage'
import { startLocationTrackingAsync, stopLocationTrackingAsync } from './Tracking'
import {db, auth} from '../../firebase'
import { collection, addDoc} from "firebase/firestore"
import polyline from 'polyline'



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

      addDoc(collection(db, `trainings/`),
        {
            startingTime: sessionStorage.getItem('startingTime'),
            endingTime: endingTime,
            coordinates: coordinates.coords,
            length: length,
            user: auth.currentUser.uid
        }
      ).catch(err => console.error(err))
    }

    return(
        <View style={styles.screen} >

            <MapView 
            style={ styles.map } 
            followsUserLocation
            showsUserLocation
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
                <Text style={styles.buttonText}>{!pressed ? 'Start the run' : 'Finish the run'}</Text>
                
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
    backgroundColor:'lightgrey',
  },
  startButton:{ 
    marginTop: '5%',
    padding:10,
    borderRadius:10,
    backgroundColor:'white',
    width:'85%',
    alignItems:'center'
  },
  infoPart:{ 
    backgroundColor:'white',
    marginTop: '5%',
    margin: '5%',
    alignItems:'center',
    padding:10,
    width: '40%',
    borderRadius:10
  },
  buttonText:{
    fontSize: 25
  },
  infoText:{
    fontSize: 20
  }

})