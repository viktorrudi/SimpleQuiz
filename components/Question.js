import React, { useState, useEffect } from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { decodeEntities } from '../utils'

import AnswerFeedback from './AnswerFeedback'

export default function Question({
  question,
  allOptions,
  correctAnswer,
  updateQuestion,
  updateAnswerCount,
}) {
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const options = allOptions.sort(() => 0.5 - Math.random())

  const handleChosenAnswer = (isCorrect) => {
    setChosenAnswer(isCorrect)
    updateAnswerCount(isCorrect)
    if (!isCorrect) {
      setTimeout(updateQuestion, 1000)
    } else {
      updateQuestion(400)
    }
  }

  return (
    <View style={styles.container}>
      <Text h3 style={styles.question}>
        {decodeEntities(question)}
      </Text>
      {chosenAnswer !== null ? (
        <AnswerFeedback
          isCorrect={chosenAnswer}
          correctAnswer={correctAnswer}
        />
      ) : (
        options.map((option) => {
          const isCorrect = option === correctAnswer
          return (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => handleChosenAnswer(isCorrect)}
            >
              <Text style={styles.optionText}>{decodeEntities(option)}</Text>
            </TouchableOpacity>
          )
        })
      )}
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
  option: {
    fontSize: 10,
    alignItems: 'center',
    padding: 20,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 20,
  },
})
