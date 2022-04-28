import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,ImageBackground, View} from 'react-native'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import image from '../assets/background.jpg'
import React from 'react'

export default function LoginAndRegister() {

    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(res => console.log('user logged in'))
        .catch(err => console.error(err))
    }
    
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(res => console.log('user registered'))
        .catch(err => console.error(err))
    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            
            <ImageBackground
            source={image}
            style={styles.image}
            >

                <TextInput 
                style={styles.email}
                placeholder="email"
                onChangeText={email => setEmail(email)}
                >
                </TextInput>
                
                
                <TextInput 
                placeholder="Password"
                secureTextEntry
                style={styles.pword}
                onChangeText={pword => setPassword(pword)}
                >
                </TextInput>
            
                <TouchableOpacity 
                style={styles.login}
                onPress={login}
                ><Text style={styles.buttonText}>login</Text></TouchableOpacity>
                
                <TouchableOpacity 
                style={styles.register}
                onPress={register}
                ><Text style={styles.buttonText}>register</Text></TouchableOpacity>
            
            </ImageBackground>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    image:{ 
        alignItems:'center',
        flex:1,
        width:'100%'
    },
    email: {
        padding:10,
        backgroundColor:'lightgrey',
        marginTop: '70%',
        width: '80%',
        height: '10%',
        borderRadius:10,
        borderColor: 'black',
        borderWidth:4,
    },
    pword: {
        padding:10,
        backgroundColor:'lightgrey',
        marginTop: 10,
        width: '80%',
        height: '10%',
        borderRadius:10,
        borderColor: 'black',
        borderWidth:4,
    },
    login: {
        backgroundColor:'lightgrey',
        marginTop: '5%',
        height:'10%',
        borderColor: 'black',
        borderWidth:4,
        alignItems: 'center',
        width:'60%',
        borderRadius:10,
        
    },
    buttonText: {
        marginTop: '5%',
        fontSize: 26,
        color:'black'
    },
    register: {
        backgroundColor:'lightgrey',
        marginTop: '1%',
        height:'10%',
        borderColor: 'black',
        borderWidth:4,
        alignItems: 'center',
        width:'60%',
        borderRadius:10,
    },
})