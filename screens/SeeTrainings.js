import { View, Text,FlatList, StyleSheet } from "react-native";
import {db, auth} from '../firebase'
import React from "react";
import { getDocs, collection, snapshot, query,where  } from "firebase/firestore";
import Training from './Training'

export default function SeeTrainings() {

    const [loading, setLoading] = React.useState(true)
    const [trainings, setTrainings] = React.useState([])

    const getTrainings = async () => {
        setLoading(true)
        setTrainings([])
        const q = query(collection(db, 'trainings/') , where("user", "==", auth.currentUser.uid))
        const snapshot = await getDocs(q)
        snapshot.forEach((doc) => {
            setTrainings(arr => [...arr, doc.data()])
          });
        setLoading(false)
    }


    React.useEffect(() => getTrainings(),[])
    React.useEffect(() => console.log(trainings.length) ,[trainings])
    React.useEffect(() => console.log(`loading ${loading}`), [loading])

    return(
        <View
        style={styles.container}>


        <FlatList
        refreshing={loading}
        onRefresh={()=> getTrainings()}
        style={styles.flatlist}
        data={trainings}
        renderItem={item => {return <Training item={item}/>}}
        keyExtractor={training => training.id}
        >
         </FlatList></View>
    )
}

const styles = StyleSheet.create({
    flatlist:{
        width:'90%', 
        marginTop:40,
    },
    container:{
        alignItems:'center'
    }
})