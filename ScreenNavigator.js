import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './screens/Profile'
import CreateTraining from './screens/RunPage/CreateTraining'
import SeeTrainings from './screens/SeeTrainings'
import LoginAndRegister from './screens/LoginAndRegister'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import React from 'react'

const Tab = createBottomTabNavigator()

export default function ScreenNavigator() {

    const [user, setUser] = React.useState(auth.currentUser)

    

    React.useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
            setUser(authUser)
    })}, [])

    return(

        user ?
        <Tab.Navigator>
              <Tab.Screen name="Profile" component={Profile}  />
              <Tab.Screen name="Run" component={CreateTraining}  />
              <Tab.Screen name="Old trainings" component={SeeTrainings} />
          </Tab.Navigator> 
          : <LoginAndRegister />
    )
}