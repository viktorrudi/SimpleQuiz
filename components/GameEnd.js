import React, { useEffect } from 'react'
import { Text, Button } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

function GameEnd({ resetGame, correctCount, totalCorrect, dispatch }) {
  const centerStyle = { textAlign: 'center' }
  useEffect(() => {
    dispatch({ type: 'UPDATE_TOTAL_CORRECT', payload: correctCount })
  }, [])
  return (
    <View style={styles.container}>
      <Text h2 style={{ ...centerStyle, marginBottom: 30 }}>
        You got {correctCount} out of 10 questions correct
      </Text>
      <Button title="Go Again" onPress={resetGame} />
      <View style={{ marginTop: 30 }}>
        {correctCount !== 0 ? (
          <>
            <Text style={centerStyle}>
              🏆 Your new total score this session is 🏆
            </Text>
            <Text h2 style={centerStyle}>
              {totalCorrect}
            </Text>
          </>
        ) : (
          <Text>
            Your score didn't improve at all... It's still {totalCorrect} 🤣
          </Text>
        )}
      </View>
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

const mapStateToProps = (state) => ({
  totalCorrect: state.totalCorrect || 0,
})

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(GameEnd)
