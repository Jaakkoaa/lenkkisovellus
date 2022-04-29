import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {auth} from '../firebase'
import {signOut} from 'firebase/auth'
import React from "react";

export default function Profile() {
     
    const [profile, setProfile] = React.useState({})
    React.useEffect(() => setProfile(auth.currentUser),[])

    const logout = () => {
        signOut(auth)
        .then(() => console.log('logged out'))
        .catch(err => console.error(err))
    }

    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.row}>
                    <Text style={styles.profileText}>Email:</Text>
                    <Text style={styles.profileText}>{profile.email}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={logout}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        paddingTop:100,
    },
    profileContainer:{
        width:'80%',
        backgroundColor:'white',
        borderRadius:10,
    },
    profileText:{
        margin:10,

    },
    row:{
        flexDirection:'row',
    },
    logoutButton:{
        backgroundColor:'grey',
        width:'50%',
        marginTop:'100%',
        borderRadius:10,
        alignItems:'center',
        padding:2
    },
    buttonText:{
        fontSize:22,
        color:'lightgrey',
    },
})