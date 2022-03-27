import {StyleSheet, View, Text, Button} from 'react-native'
import MapView from 'react-native-maps'
import * as Location from'expo-location'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const styles = StyleSheet.create({
    map:{ flex:1 },
    screen:{ flex:1 },
    info:{ height:'20%',backgroundColor: 'lightblue', alignItems:'center' },
    startButton:{ backgroundColor: 'lightblue', padding:20 }
})

//sovellus toimii sen verran että kun nappia painaa, sovellus 
//console logaa käyttäjän koordinaatit niiden muuttuessa
// seuraavaksi luoda niistä polyline ja tehdä sekunttikello
//todo: polyline ja sekuntikello

export default function CreateTraining() {

    const [coords, setCoords] = React.useState([])
    const [trainingState, setTrainingState] = React.useState(false)

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({})    
        setCoords(location) 
        //tähän tyyliin: setTrainings(arr => [...arr, element]) 
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


    //kun käyttäjän location muuttuu, kartta tarkistaa onko treeni käynnissä
    //jos treeni on käynnissä location lisätään arraýhin coords
    return(
        <View style={styles.screen} >

            <MapView 
            style={ styles.map } 
            followsUserLocation
            showsUserLocation
            onUserLocationChange={() => trainingState && getLocation()}
            />

            <View
            style={styles.info} 
            >
                <FontAwesome5.Button
                style={styles.startButton}
                name='clock'
                onPress={buttonPressed}
                ></FontAwesome5.Button>

            </View>

        </View>
        
    )
}