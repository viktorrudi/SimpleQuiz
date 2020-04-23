import React from 'react'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Linking,
} from 'react-native'
import githubLogo from '../assets/github-logo.jpg'

function Home({ navigation, totalCorrect }) {
  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 5, right: 5 }}>
        <TouchableHighlight
          onPress={() =>
            Linking.openURL('https://github.com/viktorrudi/SimpleQuiz')
          }
        >
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={githubLogo}
          />
        </TouchableHighlight>
      </View>
      <Button title="Start" onPress={() => navigation.navigate('TaskSetup')} />
      <Text h4 style={styles.totalCorrect}>
        Your total score this session:
      </Text>
      <Text h1>{totalCorrect}</Text>
      {totalCorrect > 0 && (
        <Text>
          😲🤑 <Text style={{ fontStyle: 'italic' }}>good job, u smart</Text>{' '}
          🥳😎
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
