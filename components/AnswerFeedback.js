import React from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { decodeEntities } from '../utils'

export default function AnswerFeedback({ isCorrect, correctAnswer }) {
  const style = isCorrect ? styles.correct : styles.incorrect
  const message = isCorrect ? 'CORRECT 🙌' : 'WRONG 😔'
  return (
    <View style={styles.answerFeedback}>
      <Text h1 style={style}>
        {message}
      </Text>
      {!isCorrect && <Text h3>Correct: {decodeEntities(correctAnswer)}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  answerFeedback: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
})
