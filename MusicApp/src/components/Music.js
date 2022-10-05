import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../styles/colors'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Music({song}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon  name='musical-note' size={30} color={color.background}/>
      </View>
     <View style={styles.content}>
        <Text style={styles.songTitle}>{"Chuyện đôi ta"}</Text>
        <Text style={styles.songArtist}>{"Emcee L"}</Text>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 80,
        backgroundColor: color.item_unactive,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
    },
    iconContainer: {
        backgroundColor: color.text,
        height: 60,
        width: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginLeft: 10
    },
    songTitle: {
        fontSize: 20,
        color: color.text,
    },
    songArtist: {   
        fontSize: 16,
        color: color.sub_text,
    }
})