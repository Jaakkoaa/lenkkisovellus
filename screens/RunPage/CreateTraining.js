import {StyleSheet, View, Text, Button} from 'react-native'
import MapView from 'react-native-maps'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import Tracking from './Tracking'
import { TaskManagerTaskExecutor } from 'expo-task-manager'
import { sessionStorage } from '../../classes/Storage'
import { startLocationTrackingAsync, stopLocationTrackingAsync } from './Tracking'
import haversine from 'haversine'

const styles = StyleSheet.create({
    map:{ flex:1 },
    screen:{ flex:1 },
    info:{
      backgroundColor: '#ffffff',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      flexDirection:'row'
  },
    startButton:{ color: 'red' },
    infoPart:{ margin: 20, alignItems:'center' }
})


// TODO sekuntikello

export default function CreateTraining() {

    const [pressed, setPressed] = React.useState(false)
    const [locations, setLocations] = React.useState([])
    const [length, setLength] = React.useState(0)


    
    React.useEffect(() => {
      let interval = null
      if (pressed) {
        interval = setInterval(() => {
          refreshInfo()
        }, 5000) 
        } else {
          clearInterval(interval)
        }

        return () => {
          clearInterval(interval)
          refreshInfo()
        }

    },[pressed])

    const buttonPressed = () => {

        if(!pressed) {
          startLocationTrackingAsync()
          setPressed(true)
        } else {
          stopLocationTrackingAsync()
          setPressed(false)
          
        }
      } 

    const refreshInfo = () => {
      
      const coords = sessionStorage.getItem('coords')
      setLocations(coords.coords ? coords.coords : [])
      setLength(coords.runLength ? coords.runLength : 0)
      console.log(coords)
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

            <View
            style={styles.info} 
            >
              
              <View styles={styles.infoPart}>
                <Button
                style={styles.startButton}
                onPress={buttonPressed}
                title={!pressed ? 'Start the run' : 'Finish the run'}
                ></Button>
              </View>

              <View styles={styles.infoPart}>
                <Text>{Math.ceil(length) / 1000} km</Text>
              </View>


            </View>
        </View>
        
    )

  
}