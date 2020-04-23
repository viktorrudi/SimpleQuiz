import React, { useState, useEffect } from 'react'
import ErrorBoundary from 'react-native-error-boundary'
import { ThemeProvider, Button } from 'react-native-elements'

import { View } from 'react-native'

import AppNavigator from './components/AppNavigator'

const theme = {
  Button: {
    titleStyle: {
      padding: 40,
      fontSize: 60,
      margin: 10,
    },
  },
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </ErrorBoundary>
  )
}
