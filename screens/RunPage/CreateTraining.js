import {StyleSheet, View, Text, Button} from 'react-native'
import MapView from 'react-native-maps'
import BackgroundGeolocation from 'react-native-background-geolocation';
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import haversine from 'haversine'
import Timer from './Timer'

const styles = StyleSheet.create({
    map:{ flex:1 },
    screen:{ flex:1 },
    info:{ height:'20%',backgroundColor: 'lightblue', alignItems:'center' },
    startButton:{ backgroundColor: 'lightblue', padding:20 }
})


// TODO sekuntikello

export default function CreateTraining() {

    const [coords, setCoords] = React.useState([])
    const [trainingState, setTrainingState] = React.useState(false)
    const [speed, setSpeed] = React.useState('')
    const [distance , setDistance] = React.useState(0)
    const [time, setTime] = React.useState(0)


    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({})
        setCoords(arr => [...arr, {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }]) 
        setSpeed(location.coords.speed)
        calculateLength(location)
    }

    const calculateLength = (location) => {
        const end = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        const start = coords[coords.length - 2]

        console.log(haversine(start, end))

        setDistance(distance + haversine(start, end , {unit: 'meter'}))
        
    }

    const buttonPressed = () => {
        if(!trainingState) {

            console.log('training started')
            setTrainingState(true)

        } else {

            console.log('training stopped')
            setTrainingState(false)

        } 
    }

    React.useEffect(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') { 
            Alert.alert('No permission to get location')}
    },[])

    React.useEffect(() => console.log(`coordinates: ${coords.length}`),[coords])
    React.useEffect(() => console.log(`current speed: ${speed}`),[speed])
    React.useEffect(() => console.log(`current distance: ${distance}`),[distance])

    return(
        <View style={styles.screen} >

            <MapView 
            style={ styles.map } 
            followsUserLocation
            showsUserLocation
            onUserLocationChange={() => trainingState && getLocation()}
            >
                 <MapView.Polyline 
                    coordinates={coords}
                    strokeWidth={2}
                    strokeColor="red"/>

            </MapView>

            <View
            style={styles.info} 
            >
                <FontAwesome5.Button
                style={styles.startButton}
                name='clock'
                onPress={buttonPressed}
                ></FontAwesome5.Button>
            <Text>speed: {speed}</Text>
            <Text>distance: {distance}</Text>
            <Timer timerBoolean={trainingState} time={time} setTime={setTime}/>
            </View>

        </View>
        
    )
}