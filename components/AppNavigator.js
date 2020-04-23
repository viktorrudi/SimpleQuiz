import React from 'react'
import Home from './Home'
import TaskSetup from './TaskSetup'
import Task from './Task'
import { Button, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

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

function AppNavigator({ totalCorrect }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Shitty Free Quiz App',
            ...headerStyle,
          }}
        />
        <Stack.Screen
          name="TaskSetup"
          component={TaskSetup}
          options={{
            title: 'Categories',
            headerRight: () =>
              totalCorrect > 0 && (
                <Button title={`Total Score: ${String(totalCorrect)}`} />
              ),
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

const mapStateToProps = (state) => ({
  totalCorrect: state.totalCorrect || 0,
})

export default connect(mapStateToProps)(AppNavigator)
