import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import Home from '../components/home'
import Scanner from '../components/scanner/index'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Welcome to WitsScanner' }}
        />
        <Stack.Screen
          name='Scanner'
          component={Scanner}
          options={{ title: 'Wits Scanner' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default HomeStack
