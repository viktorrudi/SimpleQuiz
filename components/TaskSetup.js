import React, { useState, useEffect } from 'react'
import { Text, Button, ListItem } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'

export default function TaskSetup({ navigation }) {
  const [categories, setCategories] = useState(null)
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(({ data }) => setCategories(data.trivia_categories))
  }, [])
  if (!categories) return <Text>Get ready!</Text>
  return (
    <ScrollView>
      {categories.map(({ id, name }) => (
        <ListItem
          bottomDivider
          key={id}
          title={name}
          onPress={() =>
            navigation.navigate('Task', { category: { id, name } })
          }
        />
      ))}
    </ScrollView>
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
