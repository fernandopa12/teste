import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import ScreenHome from "./src/screens/ScreenHome";
import ScreenUpdate from "./src/screens/ScreenUpdate";

const Stack = createStackNavigator()

const App = () =>{

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='ScreenHome'
          component={ScreenHome}
          options={{headerShown:false}}
        />
        <Stack.Screen name='ScreenUpdate' component={ScreenUpdate}
          //options={{headerShown:false}}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App