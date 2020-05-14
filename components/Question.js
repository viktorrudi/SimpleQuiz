import React, { useState, useEffect } from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Bar } from 'react-native-progress'

import AnswerFeedback from './AnswerFeedback'

const initial = {
  timeLimit: 1,
  isTimeout: false,
}

export default function Question({
  currentQuestion,
  choices,
  correctAnswer,
  getNextQuestion,
  updateAnswerCount,
  onQuestionIndex,
}) {
  const buttonColor = ['#9BDFEC', '#D39ED2', '#FCC5A6', '#FCA2BB']
  const [questionTimer, setQuestionTimer] = useState(initial.timeLimit)
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const [isTimeout, setIsTimeout] = useState(false)

  const handleChosenAnswer = (isCorrect) => {
    const timeToWait = isCorrect ? 600 : 1000
    setChosenAnswer(isCorrect)
    updateAnswerCount(isCorrect)
    getNextQuestion(timeToWait, () => setChosenAnswer(null))
  }

  // Question timer
  useEffect(() => {
    const timer =
      questionTimer > 0 &&
      setInterval(() => setQuestionTimer(questionTimer - 0.01), 50)

    if (questionTimer < 0.01 && chosenAnswer === null) {
      setIsTimeout(true)
      handleChosenAnswer(false)
    }

    return () => clearInterval(timer)
  }, [questionTimer])

  // Reset timer on new question
  useEffect(() => {
    setQuestionTimer(initial.timeLimit)
    setIsTimeout(initial.isTimeout)
  }, [onQuestionIndex])

  if (chosenAnswer !== null) {
    return (
      <AnswerFeedback
        isTimeout={isTimeout}
        isCorrect={chosenAnswer}
        correctAnswer={correctAnswer}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.question}>
        {currentQuestion.question}
      </Text>
      {choices.map((choice, i) => {
        const correctStatus = choice === correctAnswer
        return (
          <TouchableOpacity
            key={choice}
            style={{ ...styles.choice, backgroundColor: buttonColor[i] }}
            onPress={() => handleChosenAnswer(correctStatus)}
          >
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        )
      })}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -80,
          zIndex: 1,
          opacity: 0.6,
        }}
      >
        {/* ProgressBar */}
        <Bar
          style={{ borderWidth: 0 }}
          progress={questionTimer}
          width={null}
          borderRadius={0}
          height={80}
          color="#9BDFEC"
        />
      </View>
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
