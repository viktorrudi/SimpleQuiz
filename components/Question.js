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
  console.log({ chosenAnswer })
  const handleChosenAnswer = (isCorrect) => {
    setChosenAnswer(isCorrect)
    updateAnswerCount(isCorrect)
    if (!isCorrect) {
      getNextQuestion(1000, () => {
        setChosenAnswer(null)
      })
    } else {
      getNextQuestion(400)
    }
  }

  if (chosenAnswer !== null)
    return (
      <AnswerFeedback isCorrect={chosenAnswer} correctAnswer={correctAnswer} />
    )

  return (
    <View style={styles.container}>
      <Text h3 style={styles.question}>
        {decodeEntities(currentQuestion.question)}
      </Text>
      {choices.map((choice) => {
        const isCorrect = choice === correctAnswer
        return (
          <TouchableOpacity
            key={choice}
            style={styles.choice}
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
  },
  choice: {
    fontSize: 10,
    alignItems: 'center',
    padding: 20,
    marginBottom: 5,
  },
  choiceText: {
    fontSize: 20,
  },
})
