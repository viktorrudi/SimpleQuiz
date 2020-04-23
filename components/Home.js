import React, { useState, useEffect } from 'react'
import { Text, Button } from 'react-native-elements'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Start" onPress={() => navigation.navigate('TaskSetup')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
