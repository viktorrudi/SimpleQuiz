import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import axios from 'axios'

import Question from './Question'
import GameEnd from './GameEnd'

import * as CONST from '../constants'

function Task({ route, navigation, dispatch }) {
  const [questions, setQuestions] = useState(null)
  const [onQuestionIndex, setQuestionIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [isEnded, setIsEnded] = useState(false)

  // Append fre$$$hh questions on mount
  useEffect(() => {
    const { category } = route.params
    axios
      .get(CONST.API.getURL(10, category.id))
      .then(({ data }) => setQuestions(data.results))
  }, [])

  const updateAnswerCount = (isCorrect) => {
    setCorrectCount((count) => count + Number(isCorrect))
  }

  const resetGame = () => {
    setIsEnded(false)
    setCorrectCount(0)
    navigation.navigate('TaskSetup')
  }

  const getNextQuestion = (wait = 0, callback) => {
    setTimeout(() => {
      if (onQuestionIndex === 9) {
        setIsEnded(true)
      } else {
        setQuestionIndex((idx) => idx + 1)
        callback?.()
      }
    }, wait)
  }

  if (!questions) return <Text>Get ready!</Text>
  if (isEnded) {
    return <GameEnd resetGame={resetGame} correctCount={correctCount} />
  }
  const currentQuestion = questions[onQuestionIndex]
  const choices = [
    ...currentQuestion?.incorrect_answers,
    currentQuestion?.correct_answer,
  ].sort(() => 0.5 - Math.random())

  return (
    <View style={styles.container}>
      <Question
        currentQuestion={currentQuestion}
        onQuestionIndex={onQuestionIndex}
        choices={choices}
        correctAnswer={currentQuestion.correct_answer}
        getNextQuestion={getNextQuestion}
        updateAnswerCount={updateAnswerCount}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.answerState}>{onQuestionIndex + 1}/10</Text>
        <Text style={styles.timer}>Correct: {correctCount}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'space-between',
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

export default connect(null, (dispatch) => ({ dispatch }))(Task)
