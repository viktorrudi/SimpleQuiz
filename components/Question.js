import React, { useState, useEffect } from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { decodeEntities } from '../utils'

export default function Question({
  question,
  allOptions,
  correctAnswer,
  updateQuestion,
  updateAnswerCount,
}) {
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const options = allOptions.sort((a, b) => 0.5 - Math.random())

  const showCorrectAnswer = (correctAnswer, chosenOption, update) => {
    setTimeout(update, 1000)
  }

  const handleChosenAnswer = (isCorrect, chosenOption) => {
    setChosenAnswer(isCorrect)
    updateAnswerCount(isCorrect)
    if (!isCorrect) {
      showCorrectAnswer(correctAnswer, chosenOption, updateQuestion)
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
              onPress={() => handleChosenAnswer(isCorrect, option)}
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
    // backgroundColor: '#61d8f9',
    marginTop: 50,
    // justifyContent: 'center',
  },
  answerFeedback: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    // color: '#fff',
    marginBottom: 10,
    padding: 20,
  },
  option: {
    fontSize: 10,
    alignItems: 'center',
    // backgroundColor: '#61d8f9',
    padding: 20,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 20,
    // color: '#fff',
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
})

function AnswerFeedback({ isCorrect, correctAnswer }) {
  const style = isCorrect ? styles.correct : styles.incorrect
  const message = isCorrect ? 'CORRECT 🙌' : 'WRONG 😔'
  return (
    <View style={styles.answerFeedback}>
      <Text h1 style={style}>
        {message}
      </Text>
      {!isCorrect && <Text h3>Correct: {correctAnswer}</Text>}
    </View>
  )
}
