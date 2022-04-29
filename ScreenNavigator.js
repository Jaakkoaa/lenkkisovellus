import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './screens/Profile'
import CreateTraining from './screens/RunPage/CreateTraining'
import SeeTrainings from './screens/SeeTrainings'
import LoginAndRegister from './screens/LoginAndRegister'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import React from 'react'
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function ScreenNavigator() {

    const [user, setUser] = React.useState(auth.currentUser)

    

    React.useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
            setUser(authUser)
    })}, [])


    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
      
        if (route.name === 'Run') {
             return <FontAwesome5 name="running" size={25}/>
            } else if (route.name === 'Old trainings') {
                 return <Entypo name="clock" size={24} color="black" />
                } else if (route.name === 'Profile') {
                    return <AntDesign name="user" size={size} color="black" />
        
        }
      }});

    return(

        user ?
        <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="Profile" component={Profile}  options={{ headerShown: false}} />
              <Tab.Screen name="Run" component={CreateTraining}  options={{ headerShown: false}} />
              <Tab.Screen name="Old trainings" component={SeeTrainings} options={{ headerShown: false}} />
          </Tab.Navigator> 
          : <LoginAndRegister />
    )
}