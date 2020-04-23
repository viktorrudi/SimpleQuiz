import React from 'react'
import Home from './Home'
import TaskSetup from './TaskSetup'
import Task from './Task'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const headerStyle = {
  headerStyle: {
    backgroundColor: '#000',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  gestureDirection: 'horizontal',
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Quiz',
            ...headerStyle,
          }}
        />
        <Stack.Screen
          name="TaskSetup"
          component={TaskSetup}
          options={{
            title: 'Categories',
            ...headerStyle,
          }}
        />
        <Stack.Screen
          name="Task"
          component={Task}
          options={({ route }) => ({
            title: route.params.category.name,
            ...headerStyle,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
