import React from 'react'
import { Text, Button } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'

export default function GameEnd({ resetGame, correctCount }) {
  return (
    <View style={styles.container}>
      <Text h2 style={{ textAlign: 'center', marginBottom: 50 }}>
        You got {correctCount} out of 10 questions correct
      </Text>
      <Button title="Restart" onPress={resetGame} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    maxHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fdf7e3',
  },
  timer: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  answerState: {
    fontSize: 25,
  },
})
