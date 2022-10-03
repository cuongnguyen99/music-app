import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MusicPlayer from './src/components/MusicPlayer'
import { color } from './src/styles/colors'

export default function App() {
  return (
    <View style={styles.root}>
      <MusicPlayer/>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})