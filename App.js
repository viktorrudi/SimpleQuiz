import React from 'react'
import ErrorBoundary from 'react-native-error-boundary'
import { ThemeProvider } from 'react-native-elements'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers'

import AppNavigator from './components/AppNavigator'

const store = createStore(reducer, applyMiddleware(thunk))
const theme = {
  Button: {
    borderRadius: 500,
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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}
