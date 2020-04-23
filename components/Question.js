import React, { useState } from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { decodeEntities } from '../utils'

import AnswerFeedback from './AnswerFeedback'

export default function Question({
  currentQuestion,
  choices,
  correctAnswer,
  getNextQuestion,
  updateAnswerCount,
}) {
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const handleChosenAnswer = (isCorrect) => {
    const timeToWait = isCorrect ? 600 : 1000
    setChosenAnswer(isCorrect)
    updateAnswerCount(isCorrect)
    getNextQuestion(timeToWait, () => setChosenAnswer(null))
  }

  const buttonColor = ['#9BDFEC', '#D39ED2', '#FCC5A6', '#FCA2BB']
  if (chosenAnswer !== null) {
    return (
      <AnswerFeedback isCorrect={chosenAnswer} correctAnswer={correctAnswer} />
    )
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.question}>
        {decodeEntities(currentQuestion.question)}
      </Text>
      {choices.map((choice, i) => {
        const isCorrect = choice === correctAnswer
        return (
          <TouchableOpacity
            key={choice}
            style={{ ...styles.choice, backgroundColor: buttonColor[i] }}
            onPress={() => handleChosenAnswer(isCorrect)}
          >
            <Text style={styles.choiceText}>{decodeEntities(choice)}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    marginBottom: 10,
    padding: 20,
    textAlign: 'center',
  },
  choice: {
    fontSize: 10,
    alignItems: 'center',
    padding: 27,
    marginBottom: 0,
    backgroundColor: 'gray',
  },
  choiceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#464646',
  },
})
