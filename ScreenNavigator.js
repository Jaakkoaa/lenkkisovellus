import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './screens/Profile'
import CreateTraining from './screens/RunPage/CreateTraining'
import SeeTrainings from './screens/SeeTrainings'

const Tab = createBottomTabNavigator()

export default function ScreenNavigator() {
    return(

        <Tab.Navigator>
              <Tab.Screen name="Profile" component={Profile}  />
              <Tab.Screen name="Run" component={CreateTraining}  />
              <Tab.Screen name="Old trainings" component={SeeTrainings} />
          </Tab.Navigator>
    )
}