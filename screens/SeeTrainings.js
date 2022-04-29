import { View, Text,FlatList } from "react-native";
import {db, auth} from '../firebase'
import React from "react";
import { getDocs, collection, snapshot, query,where  } from "firebase/firestore";
import Training from './Training'

export default function SeeTrainings() {

    const [trainings, setTrainings] = React.useState([])

    const getTrainings = async () => {
        console.log('haloo')
        const q = query(collection(db, 'trainings/') , where("user", "==", auth.currentUser.uid))
        const snapshot = await getDocs(q)
        snapshot.forEach((doc) => {
            setTrainings(arr => [...arr, doc.data()])
          });
    }

    React.useEffect(() => getTrainings(),[])
    React.useEffect(() => console.log(trainings) ,[trainings])

    return(
        <View
        style={{alignItems:'center'}}>
        <FlatList
        style={{width:'90%', marginTop:40}}
        data={trainings}
        renderItem={item => {return <Training item={item}/>}}
        keyExtractor={training => training.id}
        >
         </FlatList></View>
    )
}