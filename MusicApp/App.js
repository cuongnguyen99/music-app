import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MusicPlayer from './src/components/MusicPlayer'
import { color } from './src/styles/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={styles.root}>
      <MusicPlayer/>
    </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})