import {View, Text} from 'react-native'
import MapView from 'react-native-maps'

export default function CreateTraining() {
    return(
        <MapView style={{ flex: 1 }} 
        
        showsUserLocation
        />
    )
}