import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../styles/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'
import Slider from '@react-native-community/slider'

export default function MusicPlayer() {
  return (
    <View style={styles.container}>
        {/* Music play image */}
        <View style={[styles.containerRow, styles.iconContainer]}>
            <Icon name='musical-note' size={100} color={color.background}/>
        </View>
        {/* Song name */}
        <View style={[styles.containerRow, styles.songContentContainer]}>
            <Text style={[styles.text, styles.songTitle]}>{"Chuyện đôi ta"}</Text>
            <Text style={[styles.text, styles.songArtist]}>{"Emcee L"}</Text>
        </View>
        {/* Progress bar */}
        <View style={[styles.containerRow, styles.progressContainer]}>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={color.text}
                maximumTrackTintColor={color.sub_text}
                thumbTintColor={color.text}
            />
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{'00:00'}</Text>
                <Text style={styles.timer}>{'00:00'}</Text>
            </View>
        </View>

        {/* Button */}
        <View style={[styles.containerRow, styles.buttonContainer]}>
            <TouchableOpacity  style={styles.sub_button}>
                <Icon name='repeat' size={40} color={color.text}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.sub_button}>
                <Icon name='play-back' size={40} color={color.text}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.main_button} activeOpacity={0.7}>
                <Icon name='play' size={40} color={color.background}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.sub_button}>
                <Icon name='play-forward' size={40} color={color.text}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.sub_button}>
                <Icon name='shuffle' size={40} color={color.text}/>
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    text: {
        color: color.text,
        fontSize: 16
    },  
    containerRow: {
        alignItems: 'center',
        marginTop: 40
    },
    iconContainer: {
        backgroundColor: color.text,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        borderRadius: 300,
        overflow: 'hidden',
    },
    songContentContainer: {

    },
    songTitle: {
        fontSize: 30,
        fontWeight: '700'
    },
    songArtist: {
        color: color.sub_text,
        fontWeight: '500'
    },
    progressContainer: {
        width: '100%',
    },
    slider: {
        width: '100%',
        flexDirection: 'row',
        height: 30,
        marginVertical: 0
    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        
    },
    timer: {
        color: color.text,
        fontWeight: 'normal',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    main_button: {
        backgroundColor: color.text,
        height: 60,
        width: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5
    }
})