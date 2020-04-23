import React, { useState, useEffect } from 'react'
import { Text } from 'react-native-elements'
import ErrorBoundary from 'react-native-error-boundary'
import { StyleSheet, View, BackHandler, Button } from 'react-native'
import Question from './Question'
import GameEnd from './GameEnd'
import axios from 'axios'

export default function Task({ route, navigation }) {
  const [questions, setQuestions] = useState(null)
  const [answerCount, setAnswerCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [isEnded, setIsEnded] = useState(false)

  const updateQuestion = (wait = 0) => {
    const { category } = route.params
    axios
      .get(`https://opentdb.com/api.php?amount=1&category=${category.id}`)
      .then(({ data }) => {
        setTimeout(() => {
          setQuestions(data.results)
        }, wait)
      })
  }

  const updateAnswerCount = (isCorrect) => {
    setCorrectCount((count) => count + Number(isCorrect))
    setAnswerCount((count) => count + 1)
    setIsEnded(answerCount === 9)
  }

  const resetGame = () => {
    setAnswerCount(0)
    setCorrectCount(0)
    setIsEnded(false)
    navigation.navigate('TaskSetup')
  }

  useEffect(() => updateQuestion(), [])

  if (!questions) return <Text>Get ready!</Text>

  if (isEnded) {
    return <GameEnd resetGame={resetGame} correctCount={correctCount} />
  }

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        {questions.map(({ incorrect_answers, correct_answer, question }) => {
          return (
            <Question
              key={correct_answer}
              question={question}
              allOptions={[...incorrect_answers, correct_answer]}
              correctAnswer={correct_answer}
              updateQuestion={updateQuestion}
              updateAnswerCount={updateAnswerCount}
            />
          )
        })}
        <View style={styles.bottomContainer}>
          <Text style={styles.answerState}>{answerCount}/10</Text>
          <Text style={styles.timer}>Correct: {correctCount}</Text>
        </View>
      </View>
    </ErrorBoundary>
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
