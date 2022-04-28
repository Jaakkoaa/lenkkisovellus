import { View, Text } from "react-native";
import {db, auth} from '../firebase'
import React from "react";
import { getDocs, collection, snapshot, query,where  } from "firebase/firestore";

export default function SeeTrainings() {

    const [trainings, setTrainings] = React.useState([])

    const getTrainings = async () => {
        console.log('haloo')
        const q = query(collection(db, 'trainings/') , where("user", "==", auth.currentUser.uid))
        const snapshot = await getDocs(q)
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          });
    }

    React.useEffect(() => getTrainings(),[])

    return(
        <View><Text>see the trainings</Text></View>
    )
}