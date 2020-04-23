import React, { useState, useEffect } from 'react'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

function Home({ navigation, totalCorrect }) {
  return (
    <View style={styles.container}>
      <Button title="Start" onPress={() => navigation.navigate('TaskSetup')} />
      <Text h4 style={styles.totalCorrect}>
        Your total score this session:
      </Text>
      <Text h1>{totalCorrect}</Text>
      {totalCorrect > 0 && (
        <Text>
          😲 <Text style={{ fontStyle: 'italic' }}>good job, u smart</Text> 😎
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  totalCorrect: {
    textAlign: 'center',
    marginTop: 20,
  },
})

const mapStateToProps = (state) => ({
  totalCorrect: state.totalCorrect || 0,
})

export default connect(mapStateToProps)(Home)
